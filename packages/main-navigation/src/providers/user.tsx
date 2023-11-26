import React, {createContext, useState, useContext, ReactNode, useMemo} from 'react';
// 定义用户信息类型
interface UserInfo {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  Followers: string;
}

// 定义存储在 Context 中的数据类型
interface AuthContextType {
  isAuthenticated: boolean;
  jwt: string;
  user: UserInfo;
  setAuthData: (jwt: string, user: UserInfo) => void;
}

// 用于 localStorage 的键名
const LOCAL_STORAGE_KEYS = {
  JWT: 'jd-jwt',
  USER: 'jd-user'
};

export const AuthStorage = {
  getJwt: (): string | null => {
    return localStorage.getItem(LOCAL_STORAGE_KEYS.JWT);
  },

  setJwt: (jwt: string): void => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.JWT, jwt);
  },

  removeJwt: (): void => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.JWT);
  },

  getUser: (): UserInfo | null => {
    const userJson = localStorage.getItem(LOCAL_STORAGE_KEYS.USER);
    return userJson ? JSON.parse(userJson) : null;
  },

  setUser: (user: UserInfo): void => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.USER, JSON.stringify(user));
  },

  removeUser: (): void => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.USER);
  },

  // 清除所有认证数据
  clearAuthData: (): void => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.JWT);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.USER);
  }
};



// 创建 Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 定义 Provider 的 props 类型
interface AuthProviderProps {
  children: ReactNode;
}

// 创建 Provider 组件
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

  // 尝试从 localStorage 读取初始值
  const initialJwt = AuthStorage.getJwt() || '';
  const initialUser = AuthStorage.getUser() || JSON.parse('{}');

  const [jwt, setJwt] = useState<string>(initialJwt);
  const [user, setUser] = useState<UserInfo>(initialUser);

  const setAuthData = (newJwt: string, newUser: UserInfo) => {
    setJwt(newJwt);
    setUser(newUser);
  };

  const isAuthenticated = useMemo(() => {
    return !!(jwt && user.id)
  }, [jwt, user])

  return (
      <AuthContext.Provider value={{ jwt, user, setAuthData, isAuthenticated }}>
        {children}
      </AuthContext.Provider>
  );
};

// 创建一个自定义 hook 以便于在其他组件中使用 Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
