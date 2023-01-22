export type ApplicationError = {
  name: string;
  message: string;
};

export type ViaCEPAddress = Omit<CEPAddress, "cep" | "ibge" | "gia" | "ddd" | "siafi">;

export type CEPAddress = {
  cidade?: string,
  logradouro: string,
  complemento: string,
  bairro: string,
  localidade: string,
  uf: string,
  cep: string,
  ibge: string,
  gia: string,
  ddd: string,
  siafi: string,
};

export type RequestError = {
  status: number,
  data: object | null,
  statusText: string,
  name: string,
  message: string,
};
