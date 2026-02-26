"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const secteurs = [
  "BTP & Construction",
  "Informatique & Digital",
  "Medical & Sante",
  "Defense & Securite",
  "Energie & Environnement",
  "Transport & Logistique",
  "Formation & Education",
  "Autre",
]

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Creer un compte</h1>
                <p className="text-muted-foreground text-balance text-sm">
                  Rejoignez la plateforme et simplifiez vos reponses aux appels
                  d&apos;offres
                </p>
              </div>
              <Field className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="lastname">Nom</FieldLabel>
                  <Input id="lastname" type="text" placeholder="Dupont" required />
                </Field>
                <Field>
                  <FieldLabel htmlFor="firstname">Prenom</FieldLabel>
                  <Input id="firstname" type="text" placeholder="Jean" required />
                </Field>
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Adresse e-mail</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="nom@entreprise.fr"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="secteur">Secteur d&apos;activite</FieldLabel>
                <Select>
                  <SelectTrigger id="secteur" className="w-full">
                    <SelectValue placeholder="Selectionnez votre secteur" />
                  </SelectTrigger>
                  <SelectContent>
                    {secteurs.map((secteur) => (
                      <SelectItem key={secteur} value={secteur}>
                        {secteur}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="password">Mot de passe</FieldLabel>
                  <Input id="password" type="password" required />
                </Field>
                <Field>
                  <FieldLabel htmlFor="confirm-password">
                    Confirmer le mot de passe
                  </FieldLabel>
                  <Input id="confirm-password" type="password" required />
                </Field>
              </Field>
              <FieldDescription>
                Le mot de passe doit contenir au moins 8 caracteres.
              </FieldDescription>
              <Field>
                <Button type="submit" className="w-full">
                  Creer mon compte
                </Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                ou
              </FieldSeparator>
              <Field className="flex flex-col gap-3">
                <Button variant="outline" type="button" className="w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Continuer avec Google
                </Button>
                <Button variant="outline" type="button" className="w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 23">
                    <path fill="#f35325" d="M1 1h10v10H1z" />
                    <path fill="#81bc06" d="M12 1h10v10H12z" />
                    <path fill="#05a6f0" d="M1 12h10v10H1z" />
                    <path fill="#ffba08" d="M12 12h10v10H12z" />
                  </svg>
                  Continuer avec Microsoft
                </Button>
              </Field>
              <FieldDescription className="text-center">
                Vous avez deja un compte ?{" "}
                <Link href="/login" className="underline underline-offset-4 hover:text-primary">
                  Se connecter
                </Link>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="bg-muted relative hidden md:block">
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-primary/20 via-primary/10 to-transparent p-8">
              <div className="flex flex-col items-center gap-6 text-center">
                <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-8 text-primary"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <line x1="19" y1="8" x2="19" y2="14" />
                    <line x1="22" y1="11" x2="16" y2="11" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold">
                  Demarrez en quelques minutes
                </h2>
                <p className="text-muted-foreground max-w-xs text-sm">
                  Creez votre compte gratuitement et commencez a repondre aux
                  appels d&apos;offres avec l&apos;aide de l&apos;intelligence artificielle.
                </p>
                <ul className="text-muted-foreground flex flex-col gap-2 text-left text-sm">
                  <li className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="size-4 text-primary"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Analyse automatique des DCE
                  </li>
                  <li className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="size-4 text-primary"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Matching intelligent des competences
                  </li>
                  <li className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="size-4 text-primary"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Generation de documents assistee par IA
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        En continuant, vous acceptez nos{" "}
        <a href="#" className="underline underline-offset-4 hover:text-primary">
          Conditions d&apos;utilisation
        </a>{" "}
        et notre{" "}
        <a href="#" className="underline underline-offset-4 hover:text-primary">
          Politique de confidentialite
        </a>
        .
      </FieldDescription>
    </div>
  )
}
