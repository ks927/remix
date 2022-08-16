import React from 'react';
import { Link } from '@remix-run/react';

export default function AdminIndex() {
    return (
        <p>
            <Link to="new" className="text-blue-600 underline">
                Create New Post
            </Link>
        </p>
    )
}