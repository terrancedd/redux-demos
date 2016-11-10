import React from 'react'
import FilterLink from '../containers/FilterLink'

const Footer=()=>(
            <p>
                Show:
                {' '}
                <FilterLink
                    filter='all'
                    
                >
                All
                </FilterLink>
                {' '}
                <FilterLink
                    filter='acitive'
                    
                >
                Active
                </FilterLink>
                {' '}
                <FilterLink
                    filter='completed'
                    
                >
                Completed
                </FilterLink>
            </p>
)


export default Footer