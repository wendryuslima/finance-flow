<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes. APIs, conventions, and file structure may differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code, and pay attention to deprecation notices.

<!-- END:nextjs-agent-rules -->

# Diretrizes do Projeto

Você é um engenheiro de software sênior. Vamos construir uma aplicação escalável e robusta, seguindo práticas modernas de arquitetura, organização e manutenção de código.

## Contexto

O projeto `finance-flow` é um gestor de contas. Neste momento, o objetivo principal é registrar contas.

Cada conta poderá conter os seguintes campos:

- título
- valor
- categoria
- vencimento
- status
- descrição

Na tela de contas, haverá um card para cada registro. Esse card deve exibir:

- nome da conta
- categoria
- status
- ação para marcar como paga
- ação para editar
- badge indicando se a conta está `atrasada`, `paga` ou `pendente`

## Tecnologias e Bibliotecas

- Next.js 16
- React 19
- Tailwind CSS
- TypeScript
- shadcn/ui
- Prisma
- PostgreSQL
- next-safe-action
- Zod para validação
- React Hook Form para formulários

## Regras Gerais de Desenvolvimento

- Sempre priorize componentização. Não queremos muitos elementos aninhados em uma única página.
- Use Server Actions sempre que fizer sentido.
- Use a biblioteca `next-safe-action`, que já está instalada no projeto.
- Use `react-hook-form` com `zod` para validação de formulários.
- Centralize utilitários e bibliotecas na pasta `libs`.
- Use `DAL` e `DTO` na camada de dados.
- Coloque hooks na pasta `hooks`.
- Coloque tipos compartilhados na pasta `types`.
  -Use arrow function

## Componentes e UI

- Componentes reutilizáveis da aplicação devem ficar em uma pasta `components` dentro de `app`.
- Componentes reutilizáveis apenas de uma página devem ficar em uma pasta `components` dentro da própria pasta da página.
- Nunca crie mais de um componente no mesmo arquivo. Cada componente deve ter seu próprio arquivo.
- Use componentes da biblioteca shadcn/ui o máximo possível ao criar ou modificar componentes.
- Antes de criar um novo componente, sempre use Context7 para verificar se já existe um componente do shadcn/ui que possa ser utilizado. Caso exista, instale-o.
- Sempre use o componente `Button` do shadcn/ui (`@/components/ui/button`) para botões. Nunca use `<button>` nativo diretamente.
- Sempre use o componente `Image` do Next.js para renderizar imagens.
- Sempre veja os componentes que podem ser reutilizados na construção de uma página em `@/components/ui/page.tsx`.
- Consulte `https://ui.shadcn.com/` para verificar os componentes disponíveis antes de implementar algo do zero.

## Formulários

Use este padrão como referência:

```tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
```

## Estilização

- Nunca use cores hard-coded do Tailwind, como `text-white`, `text-white/70`, `bg-black`, `bg-white`, `text-black`, `border-[#f1f1f1]`, `bg-[#2b54ff]` ou `bg-[oklch(...)]`.
- Sempre use as cores do tema definidas em `@/app/globals.css`, como `text-background`, `text-background/70`, `bg-foreground`, `text-foreground`, `bg-primary`, `text-primary-foreground` e `border-border`.
- Caso a cor necessária não exista no tema, crie uma nova variável CSS em `@/app/globals.css`, seguindo o padrão existente.
- Antes de criar uma nova variável de cor, sempre consulte a documentação do shadcn/ui sobre theming e confirme se isso realmente é necessário.

## Autenticação

- Nunca use middleware para verificação de autenticação.
- Sempre faça a verificação de sessão na própria página usando `authClient.useSession()`.
- Páginas protegidas devem redirecionar para `/auth` caso o usuário não esteja logado.
- A página de login (`/auth`) deve redirecionar para `/` caso o usuário já esteja logado.

## Convenções de Estrutura

### Exemplo de DAL

```txt
app/_data-access/get-accounts
```

### Exemplo de Server Action

```txt
app/_actions/index.ts
app/_actions/schema.ts
```
