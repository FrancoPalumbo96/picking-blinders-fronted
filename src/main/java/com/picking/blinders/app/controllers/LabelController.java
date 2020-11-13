package com.picking.blinders.app.controllers;

import com.picking.blinders.app.models.Label;
import com.picking.blinders.app.services.LabelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/labels")
public class LabelController {

    @Autowired
    private LabelService labelService;

    @GetMapping("getZones")
    public ResponseEntity<List<String>> getZones() {
        System.out.println("Me llamaron para averiguar zonas");
        List<String> zones = labelService.getZonesWithLabelsToPrint();
        return new ResponseEntity<>(zones, HttpStatus.OK);
    }

    @GetMapping("getLabels/{zone}")
    public ResponseEntity<List<Label>> getLabels(@PathVariable String zone) {
        System.out.println("Me llamaron para conseguir las etiquetas de la zona " + zone);
        List<Label> labels = labelService.getLabelsToPrint(zone);
        return new ResponseEntity<>(labels, HttpStatus.OK);
    }

    @GetMapping("printLabel/{id}")
    public void printLabel(@PathVariable Long id) {
        labelService.printLabel(id);
    }
}
