package com.picking.blinders.app.repositories;

import com.picking.blinders.app.models.Order;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends CrudRepository<Order, Long> {

    List<Order> findByZoneAndGeneratedFalse(String zone);


}
