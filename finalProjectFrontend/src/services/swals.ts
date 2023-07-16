import Swal from "sweetalert2";
import productsService from "./products.service";

export const chooseProducts = async () => {
  Swal.fire({
    icon: "warning",
    iconColor: "red",
    title: "Your shopping cart is Empty",
    text: "Please choose products to continue shopping",
    showCloseButton: true,
    confirmButtonColor: "green",
    confirmButtonText: "OK",
  });
};
export const confirmOrder = async () => {
  Swal.fire({
    icon: "success",
    iconColor: "green",
    title: "ENJOY!",
    text: "Your order has been confirmed",
    showCloseButton: true,
    confirmButtonColor: "green",
    confirmButtonText: "OK",
  });
};
export const pleaseLogIn = async () => {
  Swal.fire({
    icon: "info",
    iconColor: "#e05c16",
    title: "Please Log In",
    text: "You must log in to continue shopping",
    showCloseButton: true,
    confirmButtonColor: "#e05c16",
    confirmButtonText: "OK",
  });
};

export const removeSwal = async (
  id: string,
  category: string,
  removeProductFromState: () => void
) => {
  Swal.fire({
    icon: "warning",
    iconColor: "red",
    title: "Delete Product",
    text: "Are you sure you want to delete this product?",
    showCloseButton: true,
    confirmButtonColor: "red",
    showCancelButton: true,
    cancelButtonColor: "green",
  }).then((result) => {
    if (result.isConfirmed) {
      productsService.removeProduct(id, category);
      removeProductFromState();
      Swal.fire({
        icon: "success",
        iconColor: "green",
        title: "Deleted!",
        text: "The product has been deleted.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  });
};

export const addedProductSeccess = async () => {
  Swal.fire({
    icon: "success",
    iconColor: "green",
    title: "Added!",
    text: "The new product has been added successfully",
    confirmButtonColor: "green",
    confirmButtonText: "Ok",
  });
};
export const productAlreadyExists = async () => {
  Swal.fire({
    icon: "error",
    iconColor: "red",
    title: "Product Already Exists",
    text: "The Product you are trying to add already exists",
    confirmButtonColor: "green",
    confirmButtonText: "Ok",
  });
};
