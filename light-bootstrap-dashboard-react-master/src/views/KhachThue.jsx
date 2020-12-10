import React, { Component } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputNumber } from 'primereact/inputnumber';
import { InputMask } from 'primereact/inputmask';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from "primereact/dropdown";
import { Calendar } from 'primereact/calendar'
import KhuTroService from '../service/khutroService';
import { RadioButton } from "primereact/radiobutton";
import classNames from 'classnames';
import '../index.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import '../index.css';
class KhachThue extends Component {
  emptyProduct = {
    id: null,
    name: "",
    gender: "",
    cmnd: null,
    phone: null,
    quequan: "",
    address: "",
    noicapCMND: "",
    bdate: "",
    datestart: "",
    dateCMND: "",
    phone: null,
    idPhong: null,
    idKhuTro: null,
    price:0,
    image:null
  };

  constructor(props) {
    super(props);

    this.state = {
      products: null,
      productDialog: false,
      deleteProductDialog: false,
      deleteProductsDialog: false,
      product: this.emptyProduct,
      selectedProducts: null,
      submitted: false,
      globalFilter: null,
      selectedKhuTro: null,
      valdt: null,
      bdate: null,
      startdate: null,
      dateCMND: null
    };
    this.productService = new KhuTroService();
    this.rightToolbarTemplate = this.rightToolbarTemplate.bind(this);
    this.priceBodyTemplate = this.priceBodyTemplate.bind(this);
    this.statusBodyTemplate = this.statusBodyTemplate.bind(this);
    this.actionBodyTemplate = this.actionBodyTemplate.bind(this);
    this.onStatusChange = this.onStatusChange.bind(this);
    this.openNew = this.openNew.bind(this);
    this.hideDialog = this.hideDialog.bind(this);
    this.saveProduct = this.saveProduct.bind(this);
    this.editProduct = this.editProduct.bind(this);
    this.confirmDeleteProduct = this.confirmDeleteProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.confirmDeleteSelected = this.confirmDeleteSelected.bind(this);
    this.deleteSelectedProducts = this.deleteSelectedProducts.bind(this);
    this.onCityChange = this.onCityChange.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onInputNumberChange = this.onInputNumberChange.bind(this);
    this.hideDeleteProductDialog = this.hideDeleteProductDialog.bind(this);
    this.hideDeleteProductsDialog = this.hideDeleteProductsDialog.bind(this);
  }

  componentDidMount() {
    this.productService
      .getProducts()
      .then(data => this.setState({ products: data }));
  }

  formatCurrency(value) {
    return value.toLocaleString("vnd", {
      style: "currency",
      currency: "VND"
    });
  }
  onCityChange(e) {
    this.setState({ selectedCity1: e.value });
  }
  openNew() {
    this.setState({
      product: this.emptyProduct,
      submitted: false,
      productDialog: true
    });
  }
  hideDialog() {
    this.setState({
      submitted: false,
      productDialog: false
    });
  }
  hideDeleteProductDialog() {
    this.setState({ deleteProductDialog: false });
  }
  hideDeleteProductsDialog() {
    this.setState({ deleteProductsDialog: false });
  }
  saveProduct() {
    let state = { submitted: true };

    if (this.state.product.name.trim()) {
      let products = [...this.state.products];
      let product = { ...this.state.product };
      if (this.state.product.id) {
        const index = this.findIndexById(this.state.product.id);

        products[index] = product;
        this.toast.show({
          severity: "success",
          summary: "Successful",
          detail: "Product Updated",
          life: 3000
        });
      } else {
        product.id = this.createId();
        products.push(product);
        this.toast.show({
          severity: "success",
          summary: "Successful",
          detail: "Product Created",
          life: 3000
        });
      }

      state = {
        ...state,
        products,
        productDialog: false,
        product: this.emptyProduct
      };
    }

    this.setState(state);
  }
  editProduct(product) {
    this.setState({
      product: { ...product },
      productDialog: true
    });
  }
  confirmDeleteProduct(product) {
    this.setState({
      product,
      deleteProductDialog: true
    });
  }
  deleteProduct() {
    let products = this.state.products.filter(
      (val) => val.id !== this.state.product.id
    );
    this.setState({
      products,
      deleteProductDialog: false,
      product: this.emptyProduct
    });
    this.toast.show({
      severity: "success",
      summary: "Successful",
      detail: "Product Deleted",
      life: 3000
    });
  }
  findIndexById(id) {
    let index = -1;
    for (let i = 0; i < this.state.products.length; i++) {
      if (this.state.products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }
  createId() {
    let id = "";
    let chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }
  confirmDeleteSelected() {
    this.setState({ deleteProductsDialog: true });
  }

  deleteSelectedProducts() {
    let products = this.state.products.filter(
      (val) => !this.state.selectedProducts.includes(val)
    );
    this.setState({
      products,
      deleteProductsDialog: false,
      selectedProducts: null
    });
    this.toast.show({
      severity: "success",
      summary: "Successful",
      detail: "Products Deleted",
      life: 3000
    });
  }
  onStatusChange(e) {
    let product = { ...this.state.product };
    product["gender"] = e.value;
    this.setState({ product });
  }
  onInputChange(e, name) {
    const val = (e.target && e.target.value) || "";
    let product = { ...this.state.product };
    product[`${name}`] = val;

    this.setState({ product });
  }

  onInputNumberChange(e, name) {
    const val = e.value || 0;
    let product = { ...this.state.product };
    product[`${name}`] = val;

    this.setState({ product });
  }

  rightToolbarTemplate() {
    return (
      <React.Fragment>

        <Button
          label="New"
          icon="pi pi-plus"
          className="p-button-success p-mr-2"
          onClick={this.openNew}
        />
        <Button
          label="Delete"
          icon="pi pi-trash"
          className="p-button-danger"
          onClick={this.confirmDeleteSelected}
          disabled={
            !this.state.selectedProducts || !this.state.selectedProducts.length
          }
        />
      </React.Fragment>
    );
  }
  priceBodyTemplate(rowData) {
    return this.formatCurrency(rowData.price);
  }

  statusBodyTemplate(rowData) {
    return (
      <span
        className={`product-badge status-${rowData.inventoryStatus.toLowerCase()}`}
      >
        {rowData.inventoryStatus}
      </span>
    );
  }
  actionBodyTemplate(rowData) {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success p-mr-2"
          onClick={() => this.editProduct(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => this.confirmDeleteProduct(rowData)}
        />
      </React.Fragment>
    );
  }

  render() {
    const header = (
      <div className="table-header">
        <h5 className="p-m-0">Quản lý khách thuê</h5>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            type="search"
            onInput={(e) => this.setState({ globalFilter: e.target.value })}
            placeholder="Search..."
          />
        </span>
      </div>
    );
    const productDialogFooter = (
      <React.Fragment>
        <Button
          label="Cancel"
          icon="pi pi-times"
          className="p-button-text"
          onClick={this.hideDialog}
        />
        <Button
          label="Save"
          icon="pi pi-check"
          className="p-button-text"
          onClick={this.saveProduct}
        />
      </React.Fragment>
    );
    const deleteProductDialogFooter = (
      <React.Fragment>
        <Button
          label="No"
          icon="pi pi-times"
          className="p-button-text"
          onClick={this.hideDeleteProductDialog}
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          className="p-button-text"
          onClick={this.deleteProduct}
        />
      </React.Fragment>
    );
    const deleteProductsDialogFooter = (
      <React.Fragment>
        <Button
          label="No"
          icon="pi pi-times"
          className="p-button-text"
          onClick={this.hideDeleteProductsDialog}
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          className="p-button-text"
          onClick={this.deleteSelectedProducts}
        />
      </React.Fragment>
    );

    return (
      <div className="datatable-crud-demo">
        <Toast ref={(el) => (this.toast = el)} />

        <div className="card">
          <Toolbar
            className="p-mb-4"
            right={this.rightToolbarTemplate}
          ></Toolbar>

          <DataTable
            ref={(el) => (this.dt = el)}
            value={this.state.products}
            selection={this.state.selectedProducts}
            onSelectionChange={(e) =>
              this.setState({ selectedProducts: e.value })
            }
            dataKey="id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
            globalFilter={this.state.globalFilter}
            header={header}
          >
            <Column
              selectionMode="multiple"
              headerStyle={{ width: "5rem" }}
            ></Column>
            <Column field="name" header="Tên Khách Hàng" ></Column>
            <Column field="idPhong" header="Thuê Phòng" ></Column>
            <Column field="datestart" header="Ngày bắt đầu " sortable></Column>
            <Column body={this.actionBodyTemplate}></Column>
          </DataTable>
        </div>

        <Dialog
          visible={this.state.productDialog}
          style={{ width: "850px" }}
          header="Thông tin khách thuê"
          modal
          className="p-fluid"
          footer={productDialogFooter}
          onHide={this.hideDialog}
        >

          <div className="p-formgrid p-grid">
            <div className="p-field p-col">
              <label htmlFor="name">Tên khách hàng</label>
              <InputText
                id="name"
                value={this.state.product.name}
                onChange={(e) => this.onInputChange(e, "name")}
                required
                autoFocus
                className={classNames({
                  "p-invalid": this.state.submitted && !this.state.product.name
                })}

              />
              {this.state.submitted && !this.state.product.name && (
                <small className="p-invalid">Tên không được để trống.</small>
              )}
            </div>
            <div className="p-field p-col">
              <label htmlFor="cmnd">CMND/CCCD</label>
              <InputText
                id="cmnd"
                value={this.state.product.cmnd}
                onChange={(e) => this.onInputChange(e, "cmnd")}
                required
              /> </div>
          </div>
          <div className="p-formgrid p-grid">
            <div className="p-field p-col">
              <label className="p-mb-3">Giới tính</label>
              <div className="p-field-radiobutton p-col">
                <RadioButton
                  inputId="gender1"
                  name="gender"
                  value="nam"
                  onChange={this.onStatusChange}
                  checked={this.state.product.gender === "nam"}
                />
                <label htmlFor="gender1">Nam</label>
              </div>
              <div className="p-field-radiobutton p-col">
                <RadioButton
                  inputId="gender2"
                  name="gender"
                  value="nu"
                  onChange={this.onStatusChange}
                  checked={this.state.product.gender === "nu"}
                />
                <label htmlFor="gender2">Nữ</label>
              </div>
            </div>
            <div className="p-field p-col">
              <label htmlFor="datestart">Ngày cấp</label>
              <Calendar value={this.state.dateCMND} onChange={(e) => this.setState({ dateCMND: e.value })} showIcon />
            </div>
          </div>
          <div className="p-formgrid p-grid">
            <div className="p-field p-col">

              <label htmlFor="phone">Điện thoại</label>
              <InputMask id="phone" mask="9999999999" value={this.state.valdt} onChange={(e) => this.setState({ valdt: e.value })}></InputMask>

              {this.state.submitted && !this.state.product.phone && (
                <small className="p-invalid">Không bỏ trống điện thoại.</small>
              )}
            </div>
            <div className="p-field p-col">
              <label htmlFor="address">Nơi cấp</label>
              <InputText
                id="noicapCMND"
                value={this.state.product.noicapCMND}
                onChange={(e) => this.onInputChange(e, "noicapCMND")}
                required

              /> </div>
          </div>
          <div className="p-field">
            <label htmlFor="address">Địa chỉ thường trú</label>
            <InputTextarea
              id="address"
              value={this.state.product.address}
              onChange={(e) => this.onInputChange(e, "address")}
              required
            />
          </div>
          <div className="p-formgrid p-grid">
            <div className="p-field p-col">
              <label htmlFor="bdate">Ngày sinh</label>
              <Calendar value={this.state.bdate} onChange={(e) => this.setState({ bdate: e.value })} showIcon />
            </div>
            <div className="p-field p-col">
              <label htmlFor="quequan">Nơi sinh</label>
              <InputText
                id="quequan"
                value={this.state.product.quequan}
                onChange={(e) => this.onInputChange(e, "quequan")}
                required

              /> </div>
          </div>
          <div className="p-formgrid p-grid">
            <div className="p-field p-col">
              <label htmlFor="idKhuTro">Thuê khu trọ</label>
              <Dropdown
                className="p-mr-2"
                value={this.state.selectedKhuTro}
                options={this.state.products}
                onChange={this.onCityChange}
                optionLabel="name"
                placeholder="Chọn khu trọ"
              />
            </div>
            <div className="p-field p-col">
              <label htmlFor="idPhong">Thuê phòng số</label>
              <Dropdown
                className="p-mr-2"
                value={this.state.selectedKhuTro}
                options={this.state.products}
                onChange={this.onCityChange}
                optionLabel="name"
                placeholder="Chọn phòng trọ"
              /> </div>
          </div>
          <div className="p-formgrid p-grid">
            <div className="p-field p-col">
              <label htmlFor="price">Tiền phòng</label>
              <InputNumber
                id="price"
                value={this.state.product.price}
                onValueChange={(e) => this.onInputNumberChange(e, "price")}
                mode="currency"
                currency="Vnd"
              />
            </div>
            <div className="p-field p-col">
              <label htmlFor="datestart">Ngày bắt đầu</label>
              <Calendar value={this.state.datestart} onChange={(e) => this.setState({ datestart: e.value })} showIcon />

            </div>
          </div>
          <div className="p-field">
            <label htmlFor="image">Hình ảnh</label>
            <InputTextarea
              id="image"
              value={this.state.product.image}
              onChange={(e) => this.onInputChange(e, "image")}
              required
            />
          </div>
        </Dialog>

        <Dialog
          visible={this.state.deleteProductDialog}
          style={{ width: "450px" }}
          header="Confirm"
          modal
          footer={deleteProductDialogFooter}
          onHide={this.hideDeleteProductDialog}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle p-mr-3"
              style={{ fontSize: "2rem" }}
            />
            {this.state.product && (
              <span>
                Bạn chắn chắn muốn xóa đã chọn ??? <b>{this.state.product.name}</b>
                    ?
              </span>
            )}
          </div>
        </Dialog>

        <Dialog
          visible={this.state.deleteProductsDialog}
          style={{ width: "450px" }}
          header="Confirm"
          modal
          footer={deleteProductsDialogFooter}
          onHide={this.hideDeleteProductsDialog}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle p-mr-3"
              style={{ fontSize: "2rem" }}
            />
            {this.state.product && (
              <span>
                Bạn chắc chắn muốn xóa tất cả đã chọn ??
              </span>
            )}
          </div>
        </Dialog>
      </div>
    );
  }
}

export default KhachThue;
