import React from 'react';


class SearchForm extends React.Component {
    render() {
        return (

            <div class="card my-4">
                <h5 class="card-header">Search</h5>
                <div class="card-body">
                    <form role="search" method="get" class="form-search" action="/blog/search/" _lpchecked="1">
                        <div class="input-group">
                            <input type="text" class="form-control search-query" name="q" placeholder="Search…" title="Search for:"/>
                            <span class="input-group-btn">
                                <button class="btn btn-secondary" type="button">Go!</button>
                            </span>
                        </div>
                    </form>
                </div>
            </div>

        );
    }
}

export { SearchForm };