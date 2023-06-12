export type ChildProps = {
  children?: React.ReactNode;
};

export type Product = {
  _id: string;
  title: string;
  category: Category;
  imgCode: string;
  description?: string;
  price: string;
};

export type ProductForCart = {
  product: Product;
  quantity: number;
};

export type StoreProps = {
  products: Product[];
};

export type Category = "fruits" | "vegetables" | "nuts";

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
