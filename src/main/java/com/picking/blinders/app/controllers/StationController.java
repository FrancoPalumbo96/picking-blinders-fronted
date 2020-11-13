package com.picking.blinders.app.controllers;

import com.picking.blinders.app.models.Station;
import com.picking.blinders.app.services.StationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/stations")
public class StationController {

    @Autowired
    private StationService stationService;

    @GetMapping("getStations")
    public ResponseEntity<List<Station>> getStations() {
        System.out.println("dame todas las estaciones");
        List<Station> stations = stationService.findAll();
        return new ResponseEntity<List<Station>>(stations, HttpStatus.OK);
    }
}
