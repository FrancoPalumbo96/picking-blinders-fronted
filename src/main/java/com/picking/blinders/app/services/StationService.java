package com.picking.blinders.app.services;

import com.picking.blinders.app.exceptions.ResourceNotFoundException;
import com.picking.blinders.app.models.Station;
import com.picking.blinders.app.repositories.StationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StationService {

    @Autowired
    private StationRepository stationRepository;

    public Station createStation(Station station){
        return stationRepository.save(station);
    }

    public List<Station> findAll() {
        return (List<Station>) stationRepository.findAll();
    }

    public Station getStationById(Long stationId){
        return stationRepository.findById(stationId).orElseThrow(() -> new ResourceNotFoundException("Station not found."));
    }
}
