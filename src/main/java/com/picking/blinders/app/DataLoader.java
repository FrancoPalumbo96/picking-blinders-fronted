package com.picking.blinders.app;


import com.picking.blinders.app.models.*;
import com.picking.blinders.app.repositories.*;
import com.picking.blinders.app.resources.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.*;

import java.util.stream.Stream;

@Component
public class DataLoader implements ApplicationRunner {

    private final ClientRepository clientRepository;
    private final UserRepository userRepository;
    private final StateRepository stateRepository;
    private final StationRepository stationRepository;
    private final OrderRepository orderRepository;
    private final ProductQuantityRepository productQuantityRepository;
    private final ProductRepository productRepository;
    private final BoxRepository boxRepository;
    private final PickingListProductQuantityRepository pickingListProductQuantityRepository;
    private final PickingListRepository pickingListRepository;


    final static Random random = new Random();



    @Autowired
    public DataLoader(ClientRepository clientRepository, StateRepository stateRepository,
                      OrderRepository orderRepository, ProductQuantityRepository productQuantityRepository,
                      ProductRepository productRepository, StationRepository stationRepository,
                      BoxRepository boxRepository, PickingListRepository pickingListRepository,
                      PickingListProductQuantityRepository pickingListProductQuantityRepository,
                      UserRepository userRepository) {
        this.clientRepository = clientRepository;
        this.stateRepository = stateRepository;
        this.orderRepository = orderRepository;
        this.productQuantityRepository = productQuantityRepository;
        this.productRepository = productRepository;
        this.stationRepository = stationRepository;
        this.boxRepository = boxRepository;
        this.pickingListRepository = pickingListRepository;
        this.pickingListProductQuantityRepository = pickingListProductQuantityRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        userRepository.save(new User("franco", "franco@gmail.com",
        new BCryptPasswordEncoder().encode("password"), "1234", "1234"));

        //Data Loader for Clients
        //TODO agregarle dirección
        List<Client> clients = new ArrayList<>();
        for (int i = 1; i <= 10; i++)
            clients.add(
                    new Client(
                            "Client" + i,
                            "Lastname",
                            "client" + i + "@gmail.com",
                            ""+(20000000 + i),
                            ""+(123456780 + i),
                            "20"+(20000000 + i)
                    )
            );
        clientRepository.saveAll(clients);

        String[] possibleStates = {"En curso", "Calidad", "Fallo", "Finalizado", "Faltante"};
        List<State> states = new ArrayList<>();
        //Data Loader for States
        for (int i = 0; i <possibleStates.length; i++){
            State state = new State(possibleStates[i]);
            states.add(state);
        }
        stateRepository.saveAll(states);

        //Data Loader for Orders
        List<Order> orders = new ArrayList<>();
        for (int i = 1; i<= 10; i++){
            String zone;
            if (i % 2 == 0) {
                zone = "1111";
            } else {
                zone = "2222";
            }
            orders.add(
                    new Order(
                         zone,
                         clients.get(i-1)
                    )
            );
        }
        orderRepository.saveAll(orders);

        //Data Loader for Station
        List<Station> stations = new ArrayList<>();
        for(char alphabet = 'a'; alphabet <='f'; alphabet++ )
        {
            stations.add(new Station(
                    ""+Character.toUpperCase(alphabet)
            ));
        }
        stationRepository.saveAll(stations);


        //Data Loader for Products
        List<Product> products = new ArrayList<>(
                Arrays.asList(
                        new Product("Pack Lapiceras", 2, stations.get(0)),
                        new Product("Resma", 10, stations.get(1)),
                        new Product("Pack Gomas", 3, stations.get(2)),
                        new Product("Pack Liquid", 4, stations.get(3))
                )
        );

        productRepository.saveAll(products);

        //Data Loader for Product-Quantity
        List<ProductQuantity> productQuantities = new ArrayList<>();
        for (int i = 0; i< orders.size(); i++){
            //TODO this randomizes orders
            /*int randomDifferentProducts = random.nextInt(products.size() -1) +1;
            List<Product> randomProducts = new ArrayList<>(products);
            Collections.shuffle(randomProducts);
            for(int j = 0; j<randomDifferentProducts; j++){
                int randomQuantity = random.nextInt(6-1) + 1;
                productQuantities.add(new ProductQuantity(
                        randomQuantity,
                        orders.get(i),
                        randomProducts.get(j)
                ));
            }*/
            for(int j = 0; j < i+1; j++){
                if(j >= products.size()) break;
                productQuantities.add(new ProductQuantity(
                        j + 1,
                        orders.get(i),
                        products.get(j)
                ));
            }
        }
        productQuantityRepository.saveAll(productQuantities);


        //Data Loader for Boxes, Picking List, Picking List Product Quantities
        generatePickingList(orders, productQuantities, states);
    }

    public void generatePickingList(List<Order> orders, List<ProductQuantity> productQuantities, List<State> states){
        List<PickingListProductQuantity> pickingListProductQuantities = new ArrayList<>();
        List<PickingList> pickingLists = new ArrayList<>();
        List<Box> boxes = new ArrayList<>();
        for (int i = 0; i< orders.size(); i++){
            List<Product> productList = new ArrayList<>();
            for (ProductQuantity pq: productQuantities) {
                if(pq.getOrder().getId().equals(orders.get(i).getId())){
                    for(int q = 0; q < pq.getQuantity(); q++){
                        productList.add(pq.getProduct());
                    }
                }
            }
            //System.out.println("Order: " + orders.get(i).getId());
            //Ordeno de mayor a menor
            Collections.sort(productList);

            List<PickingList> orderPickingList = new ArrayList<>();
            Box box = new Box();
            PickingList pickingList = new PickingList();

            int boxVolumeLeft = Box.MaxTotalVolume;
            int boxNumber = 1;
            int sameQuantityProducts = 0;
            Product previousProduct = null;

            GeneratePickingListStates state = GeneratePickingListStates.FirstProduct;

            int index = 0;
            //Recorre todos los productos ordenados de mayor volumen a menor volumen de la orden
            while (!(productList.isEmpty() && state == GeneratePickingListStates.FinishedOrder)) {
                if(index >= productList.size()){
                    if(productList.isEmpty()){
                        state = GeneratePickingListStates.CloseBox;
                        PickingListProductQuantity plpq = new PickingListProductQuantity(
                                sameQuantityProducts, 0, previousProduct, pickingList);
                        pickingListProductQuantities.add(plpq);
                    } else {
                        if(state == GeneratePickingListStates.SearchingProduct){
                            state = GeneratePickingListStates.CloseBox;

                            PickingListProductQuantity plpq = new PickingListProductQuantity(
                                    sameQuantityProducts, 0, previousProduct, pickingList);
                            pickingListProductQuantities.add(plpq);
                        }
                        index = 0;
                    }
                }
                Product p;
                String productName = null;
                int productVolume = -1;
                if(!(state == GeneratePickingListStates.CloseBox || state == GeneratePickingListStates.NewBoxNeeded)){
                    if(index < productList.size()) {
                        p = productList.get(index);
                        productName = p.getName();
                        productVolume = p.getVolume();
                    }
                }

                switch (state){
                    case FirstProduct:
                        //System.out.println("FIRST PRODUCT");
                        previousProduct = productList.remove(index);
                        sameQuantityProducts += 1;
                        if(boxVolumeLeft - productVolume < 0){
                            throw new RuntimeException("El producto es mas grande que la caja");
                        }
                        boxVolumeLeft -= productVolume;
                        state = GeneratePickingListStates.NextProduct;
                        break;
                    case NextProduct:
                        //El actual producto es igual al anterior
                        if(previousProduct.getName().equals(productName)){
                            //El actual producto entra en la caja?
                            switch (boxSpaceLeft(boxVolumeLeft, productVolume)){
                                case 1:
                                    previousProduct = productList.remove(index);
                                    sameQuantityProducts += 1;
                                    boxVolumeLeft -= productVolume;
                                    state = GeneratePickingListStates.NextProduct;
                                    break;
                                case 0:
                                    previousProduct = productList.remove(index);
                                    sameQuantityProducts += 1;
                                    boxVolumeLeft -= productVolume;
                                    PickingListProductQuantity plpq = new PickingListProductQuantity(
                                            sameQuantityProducts, 0, previousProduct, pickingList);
                                    pickingListProductQuantities.add(plpq);
                                    state = GeneratePickingListStates.CloseBox;
                                    break;
                                case -1:
                                    index += 1;
                                    state = GeneratePickingListStates.SearchingProduct;
                                    break;
                            }
                        } else {
                            //El actual producto entra en la caja?
                            PickingListProductQuantity plpq;
                            switch (boxSpaceLeft(boxVolumeLeft, productVolume)){
                                case 1:
                                    plpq = new PickingListProductQuantity(
                                            sameQuantityProducts, 0, previousProduct, pickingList);
                                    pickingListProductQuantities.add(plpq);
                                    sameQuantityProducts = 1;
                                    previousProduct = productList.remove(index);
                                    boxVolumeLeft -= productVolume;
                                    state = GeneratePickingListStates.NextProduct;
                                    break;
                                case 0:
                                    plpq = new PickingListProductQuantity(
                                            sameQuantityProducts, 0, previousProduct, pickingList);
                                    pickingListProductQuantities.add(plpq);
                                    sameQuantityProducts = 1;
                                    previousProduct = productList.remove(index);
                                    boxVolumeLeft -= productVolume;
                                    state = GeneratePickingListStates.CloseBox;
                                    break;
                                case -1:
                                    state = GeneratePickingListStates.SearchingProduct;
                                    index+=1;
                                    break;
                            }
                        }
                        break;
                    case NewBoxNeeded:
                        boxNumber += 1;
                        box = new Box();
                        pickingList = new PickingList();
                        sameQuantityProducts = 1;
                        boxVolumeLeft = Box.MaxTotalVolume;
                        state = GeneratePickingListStates.FirstProduct;
                        break;
                    case CloseBox:
                        box.setBoxNumber(boxNumber);
                        box.setState(states.get(0));
                        box.setOrder(orders.get(i));
                        box.setTotalVolume(Box.MaxTotalVolume);
                        pickingList.setBox(box);
                        orderPickingList.add(pickingList);
                        previousProduct = null;
                        if(productList.isEmpty()){
                            state = GeneratePickingListStates.FinishedOrder;
                        } else {
                            state = GeneratePickingListStates.NewBoxNeeded;
                        }
                        break;
                    case SearchingProduct:
                        switch (boxSpaceLeft(boxVolumeLeft, productVolume)){
                            case 1:
                                previousProduct = productList.remove(index);
                                sameQuantityProducts = 1;
                                boxVolumeLeft -= productVolume;
                                state = GeneratePickingListStates.NextProduct;
                                break;
                            case 0:
                                previousProduct = productList.remove(index);
                                sameQuantityProducts = 1;
                                boxVolumeLeft -= productVolume;
                                PickingListProductQuantity plpq = new PickingListProductQuantity(
                                        sameQuantityProducts, 0, previousProduct, pickingList);
                                pickingListProductQuantities.add(plpq);
                                state = GeneratePickingListStates.CloseBox;
                                break;
                            case -1:
                                index+=1;
                                state = GeneratePickingListStates.SearchingProduct;
                                break;
                        }
                        break;
                }
            }

            for (PickingList pl: orderPickingList) {
                pl.getBox().setTotalBoxes(boxNumber);
                pickingLists.add(pl);
                boxes.add(pl.getBox());
            }
            orderPickingList.clear();
        }
        boxRepository.saveAll(boxes);
        pickingListRepository.saveAll(pickingLists);
        pickingListProductQuantityRepository.saveAll(pickingListProductQuantities);
    }
    private int boxSpaceLeft(int boxVolume, int productVolume){
        if(productVolume < 0){
            throw new RuntimeException("El volumen del producto no puede ser menor que 0");
        }
        return Integer.compare(boxVolume - productVolume, 0);
    }
    enum GeneratePickingListStates {
        FirstProduct,
        SearchingProduct,
        NextProduct,
        NewBoxNeeded,
        CloseBox,
        FinishedOrder
    }
}


