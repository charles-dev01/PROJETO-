# 🏎️ CARBUY | Automotive Marketplace & Admin Ecosystem

[![Author](https://img.shields.io/badge/Author-Charles%20Henrique%20Da%20Silva%20Lima-FFD600?style=for-the-badge&logo=github&logoColor=black)](https://github.com/charleshenriquebr123br)
[![Tech Stack](https://img.shields.io/badge/Stack-React%20%2B%20Firebase-00E5FF?style=for-the-badge)](https://react.dev/)
[![Design](https://img.shields.io/badge/Design-Calm%20Rounded-FF90E8?style=for-the-badge)](https://tailwindcss.com/)

---

## 📖 Visão Geral

O **CARBUY** é uma plataforma full-stack de última geração voltada para o mercado automotivo. Desenvolvido para oferecer uma experiência de compra e venda fluida, o projeto combina uma loja voltada ao consumidor com um ecossistema administrativo robusto para gestão de inventário, critérios de julgamento e configurações globais de sistema.

Com um design focado na **acessibilidade** e uma arquitetura baseada em **dados em tempo real**, o CARBUY redefine como usuários interagem com catálogos de veículos e como administradores gerenciam processos complexos.

---

## 🚀 Funcionalidades Principais

### 🏢 Painel Administrativo (Admin Hub)
- **Autenticação Segura:** Login centralizado via Google Auth.
- **Gestão de Critérios:** CRUD completo de parâmetros de julgamento com pesos e notas máximas.
- **Configurações Globais:** Controle de status do sistema, títulos de eventos e datas operacionais.
- **Dashboard de Analytics:** Monitoramento em tempo real de acessos e ações administrativas.
- **Auditoria de Erros:** Sistema estruturado de logs para operações do Firestore.

### 🛒 Experiência do Cliente (Storefront)
- **Semantic Search:** Busca inteligente que entende a intenção do usuário.
- **Filtros Dinâmicos:** Navegação por categorias, tipos de veículos e marcas.
- **Favoritos:** Salva o interesse do usuário em tempo real.
- **Design Adaptativo:** Experiência otimizada para Desktop, Mobile e Tablets.

### ♿ Acessibilidade Integrada (A11y)
- **Modo Escuro (Dark Mode):** Interface adaptável à iluminação ambiente.
- **Dyslexia Font:** Opção de fonte `OpenDyslexic` para facilitar a leitura.
- **High Contrast:** Paleta de cores maximizada para usuários com baixa visão.
- **Reduce Motion:** Respeito às preferências de sistema para reduzir animações.

---

## 🛠️ Tecnologias & Bibliotecas

O projeto utiliza o que há de mais moderno no ecossistema web:

| Categoria | Tecnologia |
| :--- | :--- |
| **Core** | [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/) |
| **Backend** | [Firebase](https://firebase.google.com/) (Auth, Firestore, Analytics) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/) |
| **Animações** | [Framer Motion (motion)](https://motion.dev/) |
| **Navegação** | [React Router 6](https://reactrouter.com/) |
| **Tipografia** | OpenDyslexic, Geist, Unbounded, Inter |
| **Ícones** | [Lucide React](https://lucide.dev/) |

---

## 📂 Organização do Projeto

A estrutura de pastas segue padrões de escalabilidade e separação de interesses:

```text
src/
├── components/          # Componentes reutilizáveis
│   ├── layout/          # Navbar, Footer, Hero, Sidebar
│   ├── shared/          # Cards, SearchBox, Modais, AnalyticsTracker
│   └── ui/              # Componentes base (shadcn)
├── context/             # Provedores de Estado (Auth, A11y)
├── lib/                 # Utilitários, Configurações Firebase, Error Handlers
├── pages/               # Páginas principais (Store, Admins, Criteria, Settings)
├── services/            # Lógica de Busca Semântica e APIs
├── types/               # Definições de Tipagem TypeScript
├── App.tsx              # Roteamento e Inicialização
└── index.css            # Estilos Globais e Variáveis de Acessibilidade
```

---

## ⚙️ Como Usar

### Pré-requisitos
- [Node.js](https://nodejs.org/) (v18+)
- Conta no [Firebase Console](https://console.firebase.google.com/)

### Instalação

1. Clone o repositório ou faça o download dos arquivos:
   ```bash
   git clone <url-do-repositorio>
   cd carbuy
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na raiz ou atualize o `firebase-applet-config.json` com suas credenciais do Firebase.

4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

5. Realize o build para produção:
   ```bash
   npm run build
   ```

---

## 👨‍💻 Autor

**Charles Henrique Da Silva Lima**
*Desenvolvedor Full Stack Enthusiast*

Desenvolvido com foco em excelência técnica e impacto social através da acessibilidade.

---

> "Se você pode imaginar, nós podemos automatizar." - Desenvolvido no AI Studio Build.
