
const Pagination = ({ pageData, handlePageChange }) => {
    return (
      <div className='d-flex justify-content-center mt-5'>
          <nav aria-label="Page navigation">
              <ul className="pagination">
                  <li className={`page-item ${!pageData.has_pre && 'disabled'}`}><button type="button" onClick={() => handlePageChange(pageData.current_page-1)} className="page-link">上一頁</button>
                  </li>
  
                  {Array.from({ length: pageData.total_pages }).map((_, index) => (
                      <li key={index} className={`page-item ${pageData.current_page === index +1 && 'active'}`}>
                          <button type="button" onClick={() => handlePageChange(index+1)} className="page-link">{index+1}</button>
                      </li>
                  ))}
  
                  <li className={`page-item ${!pageData.has_next && 'disabled'}`}><button type="button" onClick={() => handlePageChange(pageData.current_page+1)} className="page-link">下一頁</button>
                  </li>
              </ul>
          </nav>
      </div>
    )
  }
  
  export default Pagination
  