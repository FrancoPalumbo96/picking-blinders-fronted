package com.picking.blinders.app.services;

import com.picking.blinders.app.models.PickingList;
import com.picking.blinders.app.repositories.PickingListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PickingListService {

    @Autowired
    private PickingListRepository pickingListRepository;

    public PickingList getPickingListByBoxId(Long boxId){
        return pickingListRepository.findByBox_Id(boxId);
    }
}
