const TransactionCardItem = ({ data, handleModal, setData }) => {
    const dispatch = useDispatch();
    const { id, transactionDate, type, categoryId, comment, amount } = data;
  
    const categories = useSelector(selectCategories);
  
    const handleDelete = (transactionId, amount) => {
      dispatch(deleteTransactionThunk(transactionId))
        .unwrap()
        .then(() => {
          dispatch(changeBalanceValue(amount));
        });
    };
  
    function formatNumber(number) {
      return Math.abs(number)
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, '$& ');
    }
  
    function handleEditClick() {
      setData(data);
      handleModal(true);
    }
  
    return (
      <Card>
        <CardLine $plus={amount >= 0}>
          <CardLineTitle>Date</CardLineTitle>
          <CardLineP>{transactionDate.replaceAll('-', '.')}</CardLineP>
        </CardLine>
        <CardLine $plus={amount >= 0}>
          <CardLineTitle>Type</CardLineTitle>
          <CardLineP>{type === 'EXPENSE' ? '-' : '+'}</CardLineP>
        </CardLine>
        <CardLine $plus={amount >= 0}>
          <CardLineTitle>Category</CardLineTitle>
          <CardLineP>
            {categories?.filter(c => c?.value === categoryId)[0]?.label}
          </CardLineP>
        </CardLine>
        <CardLine $plus={amount >= 0}>
          <CardLineTitle>Comment</CardLineTitle>
          <CardLineP>{comment}</CardLineP>
        </CardLine>
        <CardLine $plus={amount >= 0}>
          <CardLineTitle>Sum</CardLineTitle>
          <CardLinePSum
            $plus={amount >= 0}
            style={
              type === 'EXPENSE' ? { color: '#FF868D' } : { color: '#FFB627' }
            }
          >
            {formatNumber(Number(amount))}
          </CardLinePSum>
        </CardLine>
        <CardLine $plus={amount >= 0}>
          <CardLineButtonDelete
            onClick={() => {
              handleDelete(id, amount);
            }}
          >
            Delete
          </CardLineButtonDelete>
          <CardLineButtonEdit type="button" onClick={handleEditClick}>
            <LuPencil style={{ fontSize: '13px', marginRight: '5px' }} />
            Edit
            {/* <CardLinePEdit> Edit</CardLinePEdit> */}
          </CardLineButtonEdit>
        </CardLine>
      </Card>
    );
  };
  