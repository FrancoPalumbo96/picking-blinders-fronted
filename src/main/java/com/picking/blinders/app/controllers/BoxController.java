package com.picking.blinders.app.controllers;

import com.picking.blinders.app.models.*;
import com.picking.blinders.app.services.BoxService;
import com.picking.blinders.app.services.PickingListProductQuantityService;
import com.picking.blinders.app.services.PickingListService;
import com.picking.blinders.app.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
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
        return new ResponseEntity<>(!getBoxPickingListForStation(boxId, stationId).isEmpty(), HttpStatus.OK);
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

    @GetMapping("changeBoxStateToMissing/{boxId}")
    public void changeBoxStateToMissing(@PathVariable Long boxId) {
        this.boxService.changeBoxStateToMissing(boxId);
    }

    @GetMapping("changeBoxStateToFlawed/{boxId}")
    public void changeBoxStateToFlawed(@PathVariable Long boxId) {
        this.boxService.changeBoxStateToFlawed(boxId);
    }

    @GetMapping("changeBoxStateToFinished/{boxId}")
    public void changeBoxStateToFinished(@PathVariable Long boxId) {
        this.boxService.changeBoxStateToFinished(boxId);
    }

    @GetMapping("changeBoxStateToInProgress/{boxId}")
    public void changeBoxStateToInProgress(@PathVariable Long boxId) {
        this.boxService.changeBoxStateToInProgress(boxId);
    }

    @GetMapping("resetBox/{boxId}")
    public void resetBox(@PathVariable Long boxId) {
        this.boxService.resetBox(boxId);
    }

    @GetMapping("getBoxStationProducts/{boxId}/{stationId}")
    public ResponseEntity<List<PickingListProductQuantity>> getBoxStationProducts(@PathVariable Long boxId, @PathVariable Long stationId){
        return new ResponseEntity<>(getBoxPickingListForStation(boxId, stationId), HttpStatus.OK);
    }

    @GetMapping("getAllBoxProducts/{boxId}")
    public ResponseEntity<List<PickingListProductQuantity>> getAllBoxProducts(@PathVariable Long boxId){
        return new ResponseEntity<>(getBoxPickingList(boxId), HttpStatus.OK);
    }

    @GetMapping("getBoxMissingProducts/{boxId}")
    public ResponseEntity<List<PickingListProductQuantity>> getBoxMissingProducts(@PathVariable Long boxId){
        return new ResponseEntity<>(getBoxMissingPickingListForStation(boxId), HttpStatus.OK);
    }

    @PutMapping("/updateProductQuantities")
    public ResponseEntity<String> updateClient(@Valid @RequestBody List<PickingListProductQuantity> pqs) {
        List<PickingListProductQuantity> newPqs = new ArrayList<>();
        for (PickingListProductQuantity pq : pqs) {
            PickingListProductQuantity pqDb = pickingListProductQuantityService.findById(pq.getId());
            pqDb.setMissingQuantity(pq.getMissingQuantity());
            newPqs.add(pqDb);
        }
        pickingListProductQuantityService.saveAll(newPqs);
        return new ResponseEntity<>("", HttpStatus.OK);
    }

    @GetMapping("getAllBoxesPrintedByZone/{zone}")
    public ResponseEntity<List<Box>> getAllBoxesPrintedByZone(@PathVariable String zone){
        List<Box> boxes = boxService.getAllBoxesPrintedByZone(zone);
        return new ResponseEntity<>(boxes, HttpStatus.OK);
    }

    @GetMapping("getAllBoxesPrintedByZoneWithStateFailed/{zone}")
    public ResponseEntity<List<Box>> getAllBoxesPrintedByZoneWithStateFailed(@PathVariable String zone){
        List<Box> boxes = boxService.getAllBoxesPrintedByZoneWithStateFailed(zone);
        return new ResponseEntity<>(boxes, HttpStatus.OK);
    }

    private List<PickingListProductQuantity> getBoxPickingListForStation(Long boxId, Long stationId) {
        PickingList pickingList = pickingListService.getPickingListByBoxId(boxId);
        List<PickingListProductQuantity> plpqs = pickingListProductQuantityService.
                getPickingListProductQuantityByPickingListId(pickingList.getId());

        List<PickingListProductQuantity> productQuantities = new ArrayList<>();
        for (PickingListProductQuantity plpq: plpqs) {
            if( plpq.getProduct().getStation().getId().equals(stationId) && plpq.getMissingQuantity() > 0 ) {
                productQuantities.add(plpq);
            }
        }
        return productQuantities;
    }

    private List<PickingListProductQuantity> getBoxPickingList(Long boxId) {
        PickingList pickingList = pickingListService.getPickingListByBoxId(boxId);
        return pickingListProductQuantityService.getPickingListProductQuantityByPickingListId(pickingList.getId());
    }

    private List<PickingListProductQuantity> getBoxMissingPickingListForStation(Long boxId) {
        PickingList pickingList = pickingListService.getPickingListByBoxId(boxId);
        List<PickingListProductQuantity> plpqs = pickingListProductQuantityService.
                getPickingListProductQuantityByPickingListId(pickingList.getId());

        List<PickingListProductQuantity> productQuantities = new ArrayList<>();
        for (PickingListProductQuantity plpq: plpqs) {
            if( plpq.getMissingQuantity() > 0 ) {
                productQuantities.add(plpq);
            }
        }
        return productQuantities;
    }
}
