package com.picking.blinders.app.services;

import com.picking.blinders.app.exceptions.ResourceNotFoundException;
import com.picking.blinders.app.models.Label;
import com.picking.blinders.app.repositories.LabelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class LabelService {

    @Autowired
    private LabelRepository labelRepository;

    public List<Label> getLabelsToPrint(String zone) {
        return labelRepository.findByPrintedFalseAndBoxOrderZone(zone);
    }

    public List<String> getZonesWithLabelsToPrint() {
        List<Label> labels = labelRepository.findByPrintedFalse();
        List<String> zones = new ArrayList<>();
        for (Label label : labels) {
            String zone = label.getBox().getOrder().getZone();
            if (!zones.contains(zone)) {
                zones.add(zone);
            }
        }
        return zones;
    }

    public void saveLabels(List<Label> labels) { labelRepository.saveAll(labels);}

    public void printLabel(Long id) {
        Label label = labelRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Label not found."));
        label.setPrinted(true);
        labelRepository.save(label);
    }

    public Label findById(Long id) {
        Optional<Label> la = labelRepository.findById(id);
        if(la.isPresent()){
            return la.get();
        } else {
            return null;
        }
        //return labelRepository.findById(id).orElseThrow();
    }
}
