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
<<<<<<< HEAD
        Optional<PickingListProductQuantity> p = pickingListProductQuantityRepository.findById(id);
        if(p.isPresent()){
            return p.get();
        } else {
            return null;
        }
        //return pickingListProductQuantityRepository.findById(id).orElseThrow();
=======
        return pickingListProductQuantityRepository.findById(id).orElseThrow();
>>>>>>> 22491273defaa42dce52eadcd22d4685fe20e244
    }

    public void saveAll(List<PickingListProductQuantity> pqs) { pickingListProductQuantityRepository.saveAll(pqs);}
}
