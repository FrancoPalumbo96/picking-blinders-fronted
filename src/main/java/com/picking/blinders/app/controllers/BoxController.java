package com.picking.blinders.app.controllers;

import com.picking.blinders.app.models.*;
import com.picking.blinders.app.services.BoxService;
import com.picking.blinders.app.services.PickingListProductQuantityService;
import com.picking.blinders.app.services.PickingListService;
import com.picking.blinders.app.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/boxes")
public class BoxController {

    @Autowired
    private BoxService boxService;
    @Autowired
    private PickingListProductQuantityService pickingListProductQuantityService;
    @Autowired
    private PickingListService pickingListService;



    @GetMapping("scanBox/{boxId}")
    public ResponseEntity<Box> getBoxById(@PathVariable Long boxId) {
        Box box = boxService.getBoxById(boxId);
        System.out.println(box);
        if(box == null){
            return new ResponseEntity<>(null, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(box, HttpStatus.OK);
        }
    }



    @GetMapping("isBoxNeeded/{boxId}/{stationId}")
    public ResponseEntity<Boolean> isBoxNeeded(@PathVariable Long boxId, @PathVariable Long stationId){
        System.out.println("me llamaron de isBoxNeeded");
        PickingList pickingList = pickingListService.getPickingListByBoxId(boxId);
        List<PickingListProductQuantity> plpqs = pickingListProductQuantityService.
                getPickingListProductQuantityByPickingListId(pickingList.getId());

        List<Product> stationProducts = new ArrayList<>();
        for (PickingListProductQuantity plpq: plpqs) {
            for (int i = 0; i<plpq.getQuantity(); i++){
                Product p = plpq.getProduct();
                if(p.getStation().getId().equals(stationId)){
                    stationProducts.add(plpq.getProduct());
                }
            }
        }
        return new ResponseEntity<>(!stationProducts.isEmpty(), HttpStatus.OK);
    }

    @GetMapping("getBoxState/{boxId}")
    public ResponseEntity<State> getBoxState(@PathVariable Long boxId) {
        ResponseEntity<Box> boxResponseEntity = getBoxById(boxId);
        Box box = boxResponseEntity.getBody();
        if (box == null) {
            return new ResponseEntity<>(null, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(box.getState(), HttpStatus.OK);
        }
    }

}
