 "use client";

import type { User } from "@prisma/client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const ChildAccounts = ({ childAccounts, userId }: { childAccounts: User[]; userId: string }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<User[]>([]);
    const [linkedChildren, setLinkedChildren] = useState<User[]>(childAccounts);

    const updateLinkedAccount = async (isChecked: boolean, parentId: string, childId: string) => {
        try {
            if (isChecked) {
                console.log(`Linking child account ${childId} to parent account ${parentId}`);
                await axios.put("/api/admin/user/linkedAccount", { parentId, childId });
                // Add to linked children
                const childToAdd = searchResults.find(r => r.id === childId);
                if (childToAdd) {
                    setLinkedChildren([...linkedChildren, childToAdd]);
                    setSearchResults(searchResults.filter(r => r.id !== childId));
                }
            } else {
                await axios.delete("/api/admin/user/linkedAccount", { data: { id: childId } });
                // Remove from linked children
                setLinkedChildren(linkedChildren.filter(child => child.id !== childId));
            }
        } catch (error) {
            console.error("Error updating linked account:", error);
        }
    };

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (searchQuery.length < 2) {
                setSearchResults([]);
                return;
            }
            console.log("Fetching search results for query:", searchQuery);
            try {
                const response = await axios.get(`/api/admin/users/search?q=${searchQuery}&exclude=${userId}`);
                setSearchResults(response.data);
            } catch (error) {
                console.error("Error fetching search results:", error);
            }
        };

        fetchSearchResults();
    }, [searchQuery]);
    return (
        <div>
            <h3>Gekoppelde accounts</h3>
            
            
                {linkedChildren && linkedChildren.length > 0 ? (
                    linkedChildren.map((child) => (
                        <label key={child.id}>
                            <input type="checkbox" checked onChange={(e) => updateLinkedAccount(e.target.checked, userId, child.id)} />
                            {child.firstName} {child.lastName}
                        </label>
                    ))
                ) : (
                    <p>Geen gekoppelde accounts</p>
                )}
                <input
                type="text"
                placeholder="Zoek gebruiker..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
                {searchResults.map((result) => (
                    <label key={result.id}>
                        <input disabled={!!result.parentAccountId} type="checkbox" onChange={(e) => updateLinkedAccount(e.target.checked, userId, result.id)} />
                        {result.parentAccountId ? (
                            <span>{result.firstName} {result.lastName} (<Link href={`/admin/gebruikers/${result.id}`}>al gekoppeld</Link>)</span>
                        ) : (
                            <span>{result.firstName} {result.lastName}</span>
                        )}
                        &nbsp;
                        
                       </label>
                ))}
            
        </div>
    );
};

export default ChildAccounts;