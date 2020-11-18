package com.picking.blinders.app.services;

import com.picking.blinders.app.exceptions.ResourceNotFoundException;
import com.picking.blinders.app.models.Box;
import com.picking.blinders.app.models.Label;
import com.picking.blinders.app.models.Order;
import com.picking.blinders.app.models.State;
import com.picking.blinders.app.repositories.BoxRepository;
import com.picking.blinders.app.repositories.LabelRepository;
import com.picking.blinders.app.repositories.OrderRepository;
import com.picking.blinders.app.repositories.StateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class LabelService {

    @Autowired
    private LabelRepository labelRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private StateRepository stateRepository;

    @Autowired
    private BoxRepository boxRepository;

    public List<Label> getLabelsToPrint(String zone) {
        return labelRepository.findByPrintedFalseAndBoxOrderZone(zone);
    }

    public List<Label> getLabelsWithBoxStateFail(String zone) {
        State state = stateRepository.findByName("Fallo");
        List<Label> labels = labelRepository.findByPrintedTrueAndBoxOrderZoneAndBoxState(zone, state);
        return labels;
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

    public List<String> getAllZonesWithPrintedTags() {
        List<Order> orders = new ArrayList<>();
        List<Box> printedBoxes = new ArrayList<>();
        List<Label> printedLabels = labelRepository.findByPrintedTrue();
        for (Label l:printedLabels) {
            printedBoxes.add(l.getBox());
        }
        for (Box box:printedBoxes) {
            if(!orders.contains(box.getOrder())){
                orders.add(box.getOrder());
            }
        }
        List<String> zones = new ArrayList<>();
        for (Order order : orders) {
            String zone = order.getZone();
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
        return labelRepository.findById(id).orElseThrow();
    }
}
