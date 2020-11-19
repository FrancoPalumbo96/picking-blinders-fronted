package com.picking.blinders.app;


import com.picking.blinders.app.models.*;
import com.picking.blinders.app.repositories.*;
import com.picking.blinders.app.resources.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.*;

import java.util.stream.Stream;

@Component
public class DataLoader implements ApplicationRunner {

    private final ClientRepository clientRepository;
    private final UserRepository userRepository;
    private final StateRepository stateRepository;
    private final StationRepository stationRepository;
    private final OrderRepository orderRepository;
    private final ProductQuantityRepository productQuantityRepository;
    private final ProductRepository productRepository;
    private final BoxRepository boxRepository;
    private final PickingListProductQuantityRepository pickingListProductQuantityRepository;
    private final PickingListRepository pickingListRepository;


    final static Random random = new Random();



    @Autowired
    public DataLoader(ClientRepository clientRepository, StateRepository stateRepository,
                      OrderRepository orderRepository, ProductQuantityRepository productQuantityRepository,
                      ProductRepository productRepository, StationRepository stationRepository,
                      BoxRepository boxRepository, PickingListRepository pickingListRepository,
                      PickingListProductQuantityRepository pickingListProductQuantityRepository,
                      UserRepository userRepository) {
        this.clientRepository = clientRepository;
        this.stateRepository = stateRepository;
        this.orderRepository = orderRepository;
        this.productQuantityRepository = productQuantityRepository;
        this.productRepository = productRepository;
        this.stationRepository = stationRepository;
        this.boxRepository = boxRepository;
        this.pickingListRepository = pickingListRepository;
        this.pickingListProductQuantityRepository = pickingListProductQuantityRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        userRepository.save(new User("franco", "franco@gmail.com",
        new BCryptPasswordEncoder().encode("password"), "1234", "1234"));

        //Data Loader for Clients
        //TODO agregarle dirección
        List<Client> clients = new ArrayList<>();
        for (int i = 1; i <= 10; i++)
            clients.add(
                    new Client(
                            "Client" + i,
                            "Lastname",
                            "client" + i + "@gmail.com",
                            ""+(20000000 + i),
                            ""+(123456780 + i),
                            "20"+(20000000 + i)
                    )
            );
        clientRepository.saveAll(clients);

        //Data Loader for States
        String[] possibleStates = {"En curso", "Calidad", "Fallo", "Finalizado", "Faltante"};
        List<State> states = new ArrayList<>();
        for (int i = 0; i <possibleStates.length; i++){
            State state = new State(possibleStates[i]);
            states.add(state);
        }
        stateRepository.saveAll(states);

        //Data Loader for Orders
        List<Order> orders = new ArrayList<>();
        for (int i = 1; i<= 10; i++){
            String zone;
            if (i % 2 == 0) {
                zone = "1111";
            } else {
                zone = "2222";
            }
            orders.add(
                    new Order(
                         zone,
                         clients.get(i-1)
                    )
            );
        }
        orderRepository.saveAll(orders);

        //Data Loader for Station
        List<Station> stations = new ArrayList<>();
        for(char alphabet = 'a'; alphabet <'f'; alphabet++ )
        {
            stations.add(new Station(
                    ""+Character.toUpperCase(alphabet)
            ));
        }
        stationRepository.saveAll(stations);


        //Data Loader for Products
        List<Product> products = new ArrayList<>(
                Arrays.asList(
                        new Product("Pack Lapiceras", 2, stations.get(0)),
                        new Product("Pack Tijeras", 5, stations.get(0)),
                        new Product("Resma", 10, stations.get(1)),
                        new Product("Pack Gomas", 3, stations.get(2)),
                        new Product("Pack Liquid", 4, stations.get(3))
                )
        );

        productRepository.saveAll(products);

        //Data Loader for Product-Quantity
        List<ProductQuantity> productQuantities = new ArrayList<>();
        for (int i = 0; i< orders.size(); i++){
            //TODO this randomizes orders
            /*int randomDifferentProducts = random.nextInt(products.size() -1) +1;
            List<Product> randomProducts = new ArrayList<>(products);
            Collections.shuffle(randomProducts);
            for(int j = 0; j<randomDifferentProducts; j++){
                int randomQuantity = random.nextInt(6-1) + 1;
                productQuantities.add(new ProductQuantity(
                        randomQuantity,
                        orders.get(i),
                        randomProducts.get(j)
                ));
            }*/
            for(int j = 0; j < i+1; j++){
                if(j >= products.size()) break;
                productQuantities.add(new ProductQuantity(
                        j + 1,
                        orders.get(i),
                        products.get(j)
                ));
            }
        }
        productQuantityRepository.saveAll(productQuantities);
    }
}


