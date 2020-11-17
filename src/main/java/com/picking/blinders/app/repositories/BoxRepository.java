package com.picking.blinders.app.repositories;

import com.picking.blinders.app.models.Box;
import com.picking.blinders.app.models.State;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.validation.constraints.NotBlank;
import java.util.List;

@Repository
public interface BoxRepository extends CrudRepository<Box, Long> {
    List<Box> findByOrderZoneAndState(@NotBlank(message = "Zone can not be blank") String order_zone, State state);
    List<Box> findByOrderZone(@NotBlank(message = "Zone can not be blank") String order_zone);
}
