package com.picking.blinders.app.resources;

public class Pair {
    private String string;
    private Integer integer;

    public Pair(String string, Integer integer){
        this.string = string;
        this.integer = integer;
    }

    public String getString() {
        return string;
    }

    public Integer getInteger() {
        return integer;
    }
}
