import { ProductsTable } from "@/components/catalogue/products-table"

export default function CataloguePage() {
  return (
    <div className="flex flex-col gap-4 py-4 md:py-6">
      <div className="flex items-center justify-between px-4 lg:px-6">
        <div>
          <h1 className="text-2xl font-semibold">Catalogue Produits</h1>
          <p className="text-sm text-muted-foreground">
            Gérez vos références produits et services
          </p>
        </div>
      </div>
      <div className="px-4 lg:px-6">
        <ProductsTable />
      </div>
    </div>
  )
}
