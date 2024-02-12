import React, { useState, useEffect } from 'react';
import { ReactGrid, Column, Row } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";
import { fetchProduct } from '../../actions/apiUtil.ts';
import AdminNavbar from '../adminNav/adminNav.tsx';
import './itemedit.css'
interface Shoe {
    id: BigInteger;
    name: string;
    description: string;
    price: string;
    model: string;
    size: Array<{size:string; stock:number}>;
};
const getColumns=(): Column[] => [
    { columnId: "id"},
    { columnId: 'name'},
    { columnId: 'description'},
    { columnId: 'price'},
    { columnId: 'model'},
    { columnId: 'size'},
    { columnId: 'stock'},

];
const headerRow: Row = {
    rowId: 'header',
    cells: [
        { type: 'header', text: 'id' },
        { type: 'header', text: 'name' },
        { type: 'header', text: 'description' },
        { type: 'header', text: 'price' },
        { type: 'header', text: 'model' },
        { type: 'header', text: 'size' },
        { type: 'header', text: 'stock' },

    ]
}
const getRows = (shoes: Shoe[]): Row[] => {
    const sizeStockRows = shoes.flatMap((shoe, idx) => 
      shoe.size.map((sizeStock, subIdx) => ({
        rowId: `${idx}-${subIdx}`,
        cells: [
          { type: 'text', text: shoe.id.toString() },
          { type: 'text', text: shoe.name },
          { type: 'text', text: shoe.description },
          { type: 'text', text: shoe.price },
          { type: 'text', text: shoe.model },
          { type: 'text', text: JSON.stringify(sizeStock.size) },
          { type: 'text', text: JSON.stringify(sizeStock.stock) },
        ],
      }))
    );
    return [headerRow,...sizeStockRows];
  };
  
const ItemList = () => {
    const [ prods, setProducts] = useState<Shoe[]>([]);
    useEffect(() => {
        const fetchData = async()=>{
          const productData = await fetchProduct();
          // console.log(productData)
          setProducts(productData);
        }
        fetchData();
      }, []);
    const rows = getRows(prods);
    const columns = getColumns();
    

    

    return (
        <>
        <div className='nav-container'><AdminNavbar/></div>
        <div className='react-grid-container'>
        <ReactGrid
            columns={columns}
            rows={rows}
            
        />
        </div>
        
        </>
    );
};

export default ItemList;

