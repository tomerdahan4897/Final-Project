export type ChildProps = {
  children?: React.ReactNode;
};

export type Product = {
  _id: string;
  title: string;
  category: Category;
  imgCode: string;
  description?: string;
  price: number;
};

export type Role = "USER" | "ADMIN" | "MODERATOR" | null;

export type AddProductType = {
  title: string;
  category: string;
  imgCode: string;
  description?: string;
  price: number;
};

export type UpdatedProductType = {
  _id: string;
  title: string;
  category: Category;
  imgCode: string;
  description: string;
  price: number;
};

export type ProductForCart = {
  product: Product;
  quantity: number;
};

export type StoreProps = {
  products: Product[];
};

export type Category = "fruits" | "vegetables" | "nuts" | "";

export type SignUpType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  street: string;
  city: string;
};

export type ContactUsType = {
  fullName: string;
  mail: string;
  tel: string;
  messageContext: string;
};

export type UserContextType = {
  isLoggedIn: boolean;
  firstName?: string;
  email?: string;
  token?: string;
  login: (firstName: string, email: string, token: string) => void;
  logout: () => void;
};

export type LogInType = {
  email: string;
  password: string;
};

export type CounterProps = {
  quantity?: number;
  onChange: (count: number) => void;
};

type ProductsStoreType = {
  products: Product[];
  setProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  removeProduct: (id: string) => void;
  editProduct: (product: Product) => void;
};
