import './Pagination.css';

let Pagination = (props) => {
  let arr = [];
  for (let i = 1; i <= props.numberOfPages; i++) {
    arr.push(i);
  }

  return (
    <nav>
      <ul class="pagination mt-4">
        {arr.map((el) => {
          return (
            <li
              onClick={() => {
                props.selectPage(el);
              }}
              className={`page-item ${props.currPage === el ? "clicked2" : ""}`}
            >
              <a className="page-link" href="#/">{el}</a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Pagination;