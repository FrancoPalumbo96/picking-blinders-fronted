package com.picking.blinders.app.services;

import com.picking.blinders.app.exceptions.ResourceNotFoundException;
import com.picking.blinders.app.models.Box;
import com.picking.blinders.app.models.Order;
import com.picking.blinders.app.repositories.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public Order createOrder(Order order){
        return orderRepository.save(order);
    }

    public void saveOrders(List<Order> orders) { orderRepository.saveAll(orders);}

    public List<Order> findAll() {
        return (List<Order>) orderRepository.findAll();
    }

    public List<Order> findByZone(String zone) { return orderRepository.findByZone(zone);}

    public Order getOrderById(Long orderId){
        return orderRepository.findById(orderId).orElseThrow(() -> new ResourceNotFoundException("Order not found."));
    }
}
