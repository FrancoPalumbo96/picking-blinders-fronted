package com.picking.blinders.app.services;


import com.picking.blinders.app.exceptions.ResourceNotFoundException;
import com.picking.blinders.app.models.Box;
import com.picking.blinders.app.repositories.BoxRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BoxService {

    @Autowired
    private BoxRepository boxRepository;

    public Box createBox(Box box){
        return boxRepository.save(box);
    }

    public List<Box> findAll() {
        return (List<Box>) boxRepository.findAll();
    }

    public Box getBoxById(Long boxId){
        Optional<Box> box = boxRepository.findById(boxId);
        if(box.isPresent()){
            return box.get();
        } else {
            return null;
        }
    }





}
