import React, { Component } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from "primereact/dropdown";
import KhuTroService from '../service/khutroService';
import { RadioButton } from "primereact/radiobutton";
import classNames from 'classnames';
import '../index.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import '../index.css';

class DienNuoc extends Component {
  emptyProduct = {
    id: null,
    name: "",
    description: "",
    price: 0,
    address: "",
    inventoryStatus: ""
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
      selectedKhuTro: null
    };

    this.productService = new KhuTroService();
    this.leftToolbarTemplate = this.leftToolbarTemplate.bind(this);
   
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
    product["inventoryStatus"] = e.value;
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

  leftToolbarTemplate() {
    return (
      <React.Fragment>
        <Dropdown
          className="p-mr-2"
          value={this.state.selectedCity1}
          options={this.state.products}
          onChange={this.onCityChange}
          optionLabel="name"
          placeholder="Select a City"
          disabled={!this.state.selectedKhuTro}
        />
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
        <h5 className="p-m-0">Quản lý điện nước</h5>
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
            left={this.leftToolbarTemplate}
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
            <Column field="name" header="Tên Phòng" sortable></Column>
            <Column
              field="price"
              header="Giá Phòng"
              body={this.priceBodyTemplate}
              sortable
            ></Column>
            <Column field="address" header="Địa Chỉ" sortable></Column>
            <Column field="description" header="Ghi chú" sortable></Column>
            <Column
              field="inventoryStatus"
              header="Tình Trạng"
              body={this.statusBodyTemplate}
              sortable
            ></Column>
            <Column body={this.actionBodyTemplate}></Column>
          </DataTable>
        </div>

        <Dialog
          visible={this.state.productDialog}
          style={{ width: "450px" }}
          header="Thông tin khu trọ"
          modal
          className="p-fluid"
          footer={productDialogFooter}
          onHide={this.hideDialog}
        >
          <div className="p-field">
            <label htmlFor="name">Tên Khu Trọ</label>
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
              <small className="p-invalid">Name is required.</small>
            )}
          </div>
          <div className="p-field">
            <label htmlFor="address">Địa chỉ</label>
            <InputTextarea
              id="address"
              value={this.state.product.address}
              onChange={(e) => this.onInputChange(e, "address")}
              required
              rows={3}
              cols={10}
            />
          </div>
          <div className="p-field">
            <label htmlFor="description">Ghi chú</label>
            <InputTextarea
              id="description"
              value={this.state.product.description}
              onChange={(e) => this.onInputChange(e, "description")}
              required
            />
          </div>
          <div className="p-field">
            <label className="p-mb-3">Tình trang</label>
            <div className="p-formgrid p-grid">
              <div className="p-field-radiobutton p-col-6">
                <RadioButton
                  inputId="inventoryStatus1"
                  name="inventoryStatus"
                  value="INSTOCK"
                  onChange={this.onStatusChange}
                  checked={this.state.product.inventoryStatus === "INSTOCK"}
                />
                <label htmlFor="inventoryStatus1">Còn phòng</label>
              </div>
              <div className="p-field-radiobutton p-col-6">
                <RadioButton
                  inputId="inventoryStatus2"
                  name="inventoryStatus"
                  value="LOWSTOCK"
                  onChange={this.onStatusChange}
                  checked={this.state.product.inventoryStatus === "LOWSTOCK"}
                />
                <label htmlFor="inventoryStatus2">Hết Phòng</label>
              </div>
              <div className="p-field-radiobutton p-col-6">
                <RadioButton
                  inputId="inventoryStatus3"
                  name="inventoryStatus"
                  value="OUTOFSTOCK"
                  onChange={this.onStatusChange}
                  checked={this.state.product.inventoryStatus === "OUTOFSTOCK"}
                />
                <label htmlFor="inventoryStatus4">Đang sửa chữa</label>
              </div>
            </div>
          </div>

          <div className="p-field">
            <label htmlFor="price">Giá cả</label>
            <InputNumber
              id="price"
              value={this.state.product.price}
              onValueChange={(e) => this.onInputNumberChange(e, "price")}
              mode="currency"
              currency="Vnd"
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

export default DienNuoc;
