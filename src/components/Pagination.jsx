
const Pagination = ({ pageData, handlePageChange }) => {
    return (
      <div className='d-flex justify-content-center mt-5'>
          <nav aria-label="Page navigation">
              <ul className="pagination">
                  <li className={`page-item ${!pageData.has_pre && 'disabled'}`}><a onClick={() => handlePageChange(pageData.current_page-1)} className="page-link" href="#">上一頁</a>
                  </li>
  
                  {Array.from({ length: pageData.total_pages }).map((_, index) => (
                      <li key={index} className={`page-item ${pageData.current_page === index +1 && 'active'}`}>
                          <a onClick={() => handlePageChange(index+1)} className="page-link" href="#">{index+1}</a>
                      </li>
                  ))}
  
                  <li className={`page-item ${!pageData.has_next && 'disabled'}`}><a onClick={() => handlePageChange(pageData.current_page+1)} className="page-link" href="#">下一頁</a>
                  </li>
              </ul>
          </nav>
      </div>
    )
  }
  
  export default Pagination
  