
import React, { Component } from "react";
import { Button, Nav, NavItem } from "react-bootstrap";
import { Dropdown } from 'primereact/dropdown';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
class NhaTroNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCity1: null,
            selectedCity2: null,
            selectedCountry: null
        };

        this.cities = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];

        this.onCityChange = this.onCityChange.bind(this);
        this.onCityChange2 = this.onCityChange2.bind(this);
        this.onCountryChange = this.onCountryChange.bind(this);
    }
    onCityChange(e) {
        this.setState({ selectedCity1: e.value });
    }

    onCityChange2(e) {
        this.setState({ selectedCity2: e.value });
    }

    onCountryChange(e) {
        this.setState({ selectedCountry: e.value });
    }

    render() {

        return (
            <div>
                <Nav>
                    <NavItem  >
                        <h5>Nhà trọ</h5>
                    </NavItem>
                    <NavItem>
                        <div className="dropdown-demo">
                         
                                <Dropdown value={this.state.selectedCity1} options={this.cities} onChange={this.onCityChange} optionLabel="name" placeholder="Select a City" />
                            
                        </div>
                    </NavItem>
                </Nav>
                <Nav pullRight>
                    <div className="button">
                        <Button >Them</Button>
                        <Button>Xoa</Button>
                        <Button>Sửa</Button>
                    </div>
                </Nav>
            </div>
        );
    }
}

export default NhaTroNavbar;
