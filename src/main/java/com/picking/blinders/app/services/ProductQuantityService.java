package com.picking.blinders.app.services;

import com.picking.blinders.app.exceptions.ResourceNotFoundException;
import com.picking.blinders.app.models.ProductQuantity;
import com.picking.blinders.app.repositories.ProductQuantityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductQuantityService {

    @Autowired
    private ProductQuantityRepository productQuantityRepository;

    public ProductQuantity createProductQuantity(ProductQuantity productQuantity){
        return productQuantityRepository.save(productQuantity);
    }

    public List<ProductQuantity> findAll() {
        return (List<ProductQuantity>) productQuantityRepository.findAll();
    }

    public ProductQuantity getProductQuantityById(Long productQuantityId){
        return productQuantityRepository.findById(productQuantityId).orElseThrow(() -> new ResourceNotFoundException("ProductQuantity not found."));
    }
}
