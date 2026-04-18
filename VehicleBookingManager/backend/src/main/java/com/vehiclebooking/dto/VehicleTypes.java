package com.vehiclebooking.dto;

public class VehicleTypes {
    private boolean bus;
    private boolean van;
    private boolean car;
    private boolean luxury;

    public VehicleTypes() {
    }

    public VehicleTypes(boolean bus, boolean van, boolean car, boolean luxury) {
        this.bus = bus;
        this.van = van;
        this.car = car;
        this.luxury = luxury;
    }

    public boolean isBus() {
        return bus;
    }

    public void setBus(boolean bus) {
        this.bus = bus;
    }

    public boolean isVan() {
        return van;
    }

    public void setVan(boolean van) {
        this.van = van;
    }

    public boolean isCar() {
        return car;
    }

    public void setCar(boolean car) {
        this.car = car;
    }

    public boolean isLuxury() {
        return luxury;
    }

    public void setLuxury(boolean luxury) {
        this.luxury = luxury;
    }
}
