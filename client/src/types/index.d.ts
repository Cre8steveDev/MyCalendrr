export type User = {
  full_name: string;
};

export type AppData = {
  user: User | null;
  token: string | null;
};

export type AppState = {
  app: AppData;
  login: (data: AppData) => void;
  logout: () => void;
};
