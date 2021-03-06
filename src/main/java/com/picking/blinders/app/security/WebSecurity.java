package com.picking.blinders.app.security;

import static com.picking.blinders.app.security.SecurityConstants.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.picking.blinders.app.services.UserDetailsServiceImplementation;
import com.picking.blinders.app.services.UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import static com.picking.blinders.app.security.SecurityConstants.*;

@EnableWebSecurity
public class WebSecurity extends WebSecurityConfigurerAdapter {
    private final UserDetailsServiceImplementation userDetailsService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final UserService userService;
    private final ObjectMapper objectMapper;
    public WebSecurity(
            UserDetailsServiceImplementation userDetailsService,
            BCryptPasswordEncoder bCryptPasswordEncoder,
            UserService userService,
            ObjectMapper objectMapper
    ) {
        this.userDetailsService = userDetailsService;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.userService = userService;
        this.objectMapper = objectMapper;
    }

    /**
     * This method define which resources are public and which are secured.
     * In our case, we set the SIGN_UP_URL, ALL_USERS, HEALTHCHECK, and swagger configs endpoints as being public and everything else as being secured.
     * We also configure CORS (Cross-Origin Resource Sharing) support through http.cors()
     * and we add a custom security filter in the Spring Security filter chain.
     */
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable().authorizeRequests()
                .antMatchers(
                        SIGN_UP_URL,
                        ALL_USERS,
                        HEALTHCHECK,

                        ORDERS,
                        VEHICLE,
                        LABELS,
                        BOXES,
                        STATIONS,
                        STATION,
                        MONITORING_SYSTEM,

                        // Example
                        CRUD_BOOKS,

                        //  Swagger configs
                        SWAGGER,
                        WEBJARS,
                        V2API,
                        UICONFIG,
                        SWAGGERRESOURCES,
                        SECURITYCONFIG
                )
                .permitAll()
                .anyRequest().authenticated()
                .and()
                .addFilter(new JWTAuthenticationFilter(authenticationManager(), userService, objectMapper))
                .addFilter(new JWTAuthorizationFilter(authenticationManager()))
                // this disables session creation on Spring Security
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder);
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration corsConfiguration = new CorsConfiguration().applyPermitDefaultValues();
        corsConfiguration.addAllowedMethod("PUT");
        corsConfiguration.addAllowedMethod("DELETE");
        corsConfiguration.addAllowedMethod("GET");
        corsConfiguration.addAllowedMethod("POST");
        source.registerCorsConfiguration("/**", corsConfiguration);
        return source;
    }
}
