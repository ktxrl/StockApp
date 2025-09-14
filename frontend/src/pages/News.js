import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import AnalysisModal from '../components/AnalysisModal';

const News = () => {
  const { news, setNewsSearchTerm, setNewsCategory } = useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [analysis, setAnalysis] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 3;

  const handleOpenModal = (analysis) => {
    setAnalysis(analysis);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setAnalysis('');
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginatedNews = news.slice((currentPage - 1) * articlesPerPage, currentPage * articlesPerPage);

  return (
    <>
      <div className="px-40 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          <div className="flex flex-wrap justify-between gap-3 p-4">
            <p className="text-[#111418] tracking-light text-[32px] font-bold leading-tight min-w-72">News</p>
          </div>
          <div className="px-4 py-3">
            <label className="flex flex-col min-w-40 h-12 w-full">
              <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
                <div
                  className="text-[#60758a] flex border-none bg-[#f0f2f5] items-center justify-center pl-4 rounded-l-xl border-r-0"
                  data-icon="MagnifyingGlass"
                  data-size="24px"
                  data-weight="regular"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path
                      d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"
                    ></path>
                  </svg>
                </div>
                <input
                  placeholder="Search for news"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111418] focus:outline-0 focus:ring-0 border-none bg-[#f0f2f5] focus:border-none h-full placeholder:text-[#60758a] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                  onChange={(e) => setNewsSearchTerm(e.target.value)}
                />
              </div>
            </label>
          </div>
          <div className="flex flex-wrap gap-2 p-4">
            <button
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-3 bg-[#f0f2f5] text-[#111418] text-sm font-bold leading-normal tracking-[0.015em]"
              onClick={() => setNewsCategory('all')}
            >
              <span className="truncate">All News</span>
            </button>
            <button
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-3 bg-white text-[#111418] text-sm font-medium leading-normal"
              onClick={() => setNewsCategory('My Portfolio')}
            >
              <span className="truncate">My Portfolio</span>
            </button>
            <button
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-3 bg-white text-[#111418] text-sm font-medium leading-normal"
              onClick={() => setNewsCategory('AI Picks')}
            >
              <span className="truncate">AI Picks</span>
            </button>
            <button
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-3 bg-white text-[#111418] text-sm font-medium leading-normal"
              onClick={() => setNewsCategory('Trending Markets')}
            >
              <span className="truncate">Trending Markets</span>
            </button>
          </div>
          <div className="flex flex-wrap justify-between gap-3 p-4">
            <p className="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em]">Featured News</p>
            <div className="flex items-center gap-2">
              <p className="text-[#111418] text-sm font-medium leading-normal">Filter by date</p>
              <div className="text-[#111418]" data-icon="CaretDown" data-size="16px" data-weight="regular">
                <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80a8,8,0,0,1,11.32-11.32L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
                </svg>
              </div>
            </div>
          </div>
          {news.length > 0 && (
            <div className="p-4" key={news[0].title}>
              <div className="flex items-stretch justify-between gap-4 rounded-xl bg-white p-4 shadow-[0_0_4px_rgba(0,0,0,0.1)]">
                <div className="flex flex-[2_2_0px] flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <p className="text-[#60758a] text-sm font-normal leading-normal">{news[0].source} | {news[0].time}</p>
                    <p className="text-[#111418] text-base font-bold leading-tight">{news[0].title}</p>
                    <p className="text-[#60758a] text-sm font-normal leading-normal">
                      {news[0].insight}
                    </p>
                  </div>
                  <button
                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 flex-row-reverse bg-[#f0f2f5] text-[#111418] pr-2 gap-1 text-sm font-medium leading-normal w-fit"
                    onClick={() => handleOpenModal(news[0].insight)}
                  >
                    <div className="text-[#111418]" data-icon="CaretRight" data-size="18px" data-weight="regular">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
                      </svg>
                    </div>
                    <span className="truncate">AI Opinion</span>
                  </button>
                </div>
                <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex-1" style={{ backgroundImage: `url(${news[0].imageUrl})` }}></div>
              </div>
            </div>
          )}
          <div className="flex flex-wrap justify-between gap-3 p-4">
            <p className="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em]">Latest News</p>
          </div>
          {paginatedNews.map((newsItem) => (
            <div className="p-4" key={newsItem.title}>
              <div className="flex items-stretch justify-between gap-4 rounded-xl bg-white p-4 shadow-[0_0_4px_rgba(0,0,0,0.1)]">
                <div className="flex flex-[2_2_0px] flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <p className="text-[#60758a] text-sm font-normal leading-normal">{newsItem.source} | {newsItem.time}</p>
                    <p className="text-[#111418] text-base font-bold leading-tight">{newsItem.title}</p>
                    <p className="text-[#60758a] text-sm font-normal leading-normal">
                      {newsItem.insight}
                    </p>
                  </div>
                  <button
                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 flex-row-reverse bg-[#f0f2f5] text-[#111418] pr-2 gap-1 text-sm font-medium leading-normal w-fit"
                    onClick={() => handleOpenModal(newsItem.insight)}
                  >
                    <div className="text-[#111418]" data-icon="CaretRight" data-size="18px" data-weight="regular">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
                      </svg>
                    </div>
                    <span className="truncate">AI Opinion</span>
                  </button>
                </div>
                <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex-1" style={{ backgroundImage: `url(${newsItem.imageUrl})` }}></div>
              </div>
            </div>
          ))}
          <div className="flex justify-center items-center gap-4 p-4">
            <button
              className="text-[#111418] rounded-lg border-2 border-transparent"
              data-icon="CaretLeft"
              data-size="24px"
              data-weight="regular"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M165.66,202.34a8,8,0,0,1-11.32,0l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128l74.35,74.34A8,8,0,0,1,165.66,202.34Z"></path>
              </svg>
            </button>
            <p className="text-[#111418] text-base font-medium leading-normal">
              Page {currentPage} of {Math.ceil(news.length / articlesPerPage)}
            </p>
            <button
              className="text-[#111418] rounded-lg border-2 border-transparent"
              data-icon="CaretRight"
              data-size="24px"
              data-weight="regular"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === Math.ceil(news.length / articlesPerPage)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M90.34,202.34a8,8,0,0,1,0-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80a8,8,0,0,1,0,11.32l-80,80A8,8,0,0,1,90.34,202.34Z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <AnalysisModal isOpen={isModalOpen} onClose={handleCloseModal} analysis={analysis} />
    </>
  );
};

export default News;