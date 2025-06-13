// import FilterOrigin from "./filter-origin";


type FiltersControlsCategoryProps = {
    setFilterOrigin: (origin: string) => void
}

const FiltersControlsCategory = (props: FiltersControlsCategoryProps) => {
    // const { setFilterOrigin } = props

    return (
        <div className="sm:w-[350px] sm:mt-5 p-6">
            <p className="text-sm text-gray-500">Filtros temporalmente deshabilitados</p>
            {/* <FilterOrigin setFilterOrigin={setFilterOrigin} /> */}
        </div>
    );
}

export default FiltersControlsCategory;