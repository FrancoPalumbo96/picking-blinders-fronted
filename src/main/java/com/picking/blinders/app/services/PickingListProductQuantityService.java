package com.picking.blinders.app.services;

import com.picking.blinders.app.models.Label;
import com.picking.blinders.app.models.PickingListProductQuantity;
import com.picking.blinders.app.repositories.PickingListProductQuantityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PickingListProductQuantityService {
    @Autowired
    private PickingListProductQuantityRepository pickingListProductQuantityRepository;

    public List<PickingListProductQuantity> getPickingListProductQuantityByPickingListId(Long pickingListId){
        return pickingListProductQuantityRepository.findByPickingList_Id(pickingListId);
    }

    public PickingListProductQuantity findById(Long id) {
        Optional<PickingListProductQuantity> p = pickingListProductQuantityRepository.findById(id);
        if(p.isPresent()){
            return p.get();
        } else {
            return null;
        }
        //return pickingListProductQuantityRepository.findById(id).orElseThrow();
    }

    public void saveAll(List<PickingListProductQuantity> pqs) { pickingListProductQuantityRepository.saveAll(pqs);}
}
