import ChangeRole from "@/components/admin/ChangeRole";
import ChildAccounts from "@/components/admin/ChildAccounts";
import { Breadcrumb, Breadcrumbs } from "@/components/breadcrumbs";
import FourOhFour from "@/components/FourOhFour";
import { prisma } from "@/lib/prisma";
import type { User } from "@prisma/client";
import Link from "next/link";

type UsersWithChildren = User & {
    childAccounts?: User[];
    parentAccount?: User | null;
};

const Gebruiker = async (props: { params: Promise<{ id: string }> }) => {
    const params = await props.params;
    const user = await prisma.user.findUnique({
        include: {
            childAccounts: true,
            parentAccount: true,
        },
        where: {
            id: params.id,
        },
    });

    if (!user) {
        return <FourOhFour />;
    }

    return <UserAdmin user={user} />;
}

const UserAdmin = ({ user }: { user: UsersWithChildren }) => {
    if (!user) {
        return <div>Gebruiker niet gevonden</div>;
    }

    return (
        <div className="container mt1">
            <article>
                <header>
                    <hgroup>
                        <h1>Beheer danser</h1>
                        <Breadcrumbs>
                            <Breadcrumb href="/">Taradance</Breadcrumb>
                            <Breadcrumb href="/dashboard">Dashboard</Breadcrumb>
                            <Breadcrumb href="/admin">Administratie</Breadcrumb>
                            <Breadcrumb href="/admin/gebruikers">Gebruikers</Breadcrumb>
                            <Breadcrumb>{user.firstName} {user.lastName}</Breadcrumb>
                        </Breadcrumbs>
                    </hgroup>
                </header>
                <div className="grid">
                    <div>
                        <h3>{user.firstName} {user.lastName}</h3>
                        {user.parentAccount && <p>Onder: <Link href={`/admin/gebruikers/${user.parentAccount.id}`}>{user.parentAccount.firstName} {user.parentAccount.lastName}</Link></p>}
                        <p>{user.email}</p>
                        {user.id && <ChangeRole currentRole={user.role || undefined} id={user.id} />}
                    </div>
                    <ChildAccounts childAccounts={user.childAccounts || []} userId={user.id} />
                </div>
            </article>
        </div>
    );
};

export default Gebruiker;