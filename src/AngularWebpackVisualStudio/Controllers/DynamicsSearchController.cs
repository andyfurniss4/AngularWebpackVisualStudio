﻿using AngularWebpackVisualStudio.Models;
using AngularWebpackVisualStudio.Services;
using Microsoft.AspNetCore.Mvc;

namespace AngularWebpackVisualStudio.Controllers
{
    [Route("api/[controller]")]
    public class DynamicsSearchController : Controller
    {
        private IDynamicsSearchService SearchService = null;

        public DynamicsSearchController(IDynamicsSearchService searchService)
        {
            this.SearchService = searchService;
        }

        [HttpPost("[action]")]
        public string Search([FromBody]DynamicsSearch search)
        {
            if (!string.IsNullOrWhiteSpace(search.id))
            {
                return this.SearchService.GetJsonById(search);
            }
            else
            {
                return this.SearchService.Search(search);
            }
        }
    }
}
