package com.picking.blinders.app.controllers;

import com.picking.blinders.app.exceptions.ResourceNotFoundException;
import com.picking.blinders.app.models.*;
import com.picking.blinders.app.services.LabelService;
import com.picking.blinders.app.services.OrderService;
import com.picking.blinders.app.services.StateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;
    @Autowired
    private StateService stateService;
    @Autowired
    private LabelService labelService;
    private final int BOX_VOLUME = 100;
    private final double BOX_FILLING_PERCENTAGE = 0.9;

    @GetMapping("generateLists/{zone}")
    public ResponseEntity<Boolean> getClientById(@PathVariable String zone) {
        List<Order> orders = orderService.getOrdersForZone(zone);
        if (orders.isEmpty()) {
            return new ResponseEntity<>(false, HttpStatus.OK);
        } else {
            int volumeToFill = (int) (BOX_VOLUME * BOX_FILLING_PERCENTAGE);
            List<Label> labels = new ArrayList<>();
            for (Order order : orders) {
                ArrayList<ProductQuantity> productQuantities = new ArrayList<>(order.getProductQuantities());
                productQuantities.sort((p1, p2) -> p2.getProduct().getVolume() - p1.getProduct().getVolume());
                List<Box> boxes = new ArrayList<>();
                int boxNumber = 1;
                int totalBoxes = 0;
                boolean bool = true;
                while (bool) {
                    State state;
                    if (Math.random() < 0.2) {
                        state = stateService.findByName("Calidad");
                    } else {
                        state = stateService.findByName("En curso");
                    }
                    Box box = new Box(state, order, boxNumber, totalBoxes);
                    boxNumber++;
                    totalBoxes++;
                    PickingList pickingList = new PickingList(box);
                    int boxRemainingVolume = volumeToFill;
                    for (int i = 0; i < productQuantities.size(); i++) {
                        int aux = Math.min(boxRemainingVolume / productQuantities.get(i).getProduct().getVolume(), productQuantities.get(i).getQuantity());
                        if (aux > 0) {
                            pickingList.addPickingListProductQuantity(new PickingListProductQuantity(aux, aux, productQuantities.get(i).getProduct(), pickingList));
                            productQuantities.get(i).setQuantity(productQuantities.get(i).getQuantity() - aux);
                            boxRemainingVolume = boxRemainingVolume - aux * productQuantities.get(i).getProduct().getVolume();
                        }
                    }
                    box.addPickingList(pickingList);
                    boxes.add(box);
                    bool = false;
                    for (ProductQuantity p : productQuantities) {
                        if (p.getQuantity() != 0) {
                            bool = true;
                            break;
                        }
                    }
                }
                for (Box b : boxes) {
                    b.setTotalBoxes(totalBoxes);
                    order.addBox(b);
                }
                order.setGenerated(true);
            }
            try {
                orderService.saveOrders(orders);
                for (Order o : orders) {
                    for (Box b : o.getBoxes()) {
                        labels.add(new Label(b));
                    }
                }
                labelService.saveLabels(labels);
            } catch (Exception e) {
                e.printStackTrace();
            }
            return new ResponseEntity<>(true, HttpStatus.OK);
        }
    }
}