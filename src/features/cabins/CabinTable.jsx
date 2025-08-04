import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getCabins } from "../../services/apiCabins";

import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";

const Table = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

function CabinTable() {
  //Hook que nos permite traer, almacenar en cache y sincronizar los datos remotos
  const {
    //Desestructuramos de una vez las propiedades que necesitamos de la data retornada en queryFn
    isLoading,
    data: cabins,
    // error,
  } = useQuery({
    //Key para identificar de manera unica o si cambio el state relacionado a esta key
    queryKey: ["cabin"],
    //propiedad asincrona donde se hace el fetch o bien se almacena la funcion que hara fetch
    //retorna una promesa, dentro de la data que retorna ya lleva los loading entre otros estados
    queryFn: getCabins,
  });

  if (isLoading) return <Spinner />;
  console.log(cabins);
  return (
    <Table role="table">
      <TableHeader role="row">
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </TableHeader>
      {cabins.map((cabin) => (
        <CabinRow cabin={cabin} key={cabin.id} />
      ))}
    </Table>
  );
}

export default CabinTable;
