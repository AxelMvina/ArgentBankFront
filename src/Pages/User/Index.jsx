import { BankAccount } from "../../Components/BankAccount";
import { useSelector } from "react-redux";


export function UserPage() {
    const user = useSelector((state) => state.user.user);
    return (
        <main className="main bg-dark">
            <div className="header">
                <h1>Welcome back<br />{user.firstName} {user.lastName}{/* Affiche le prénom de l'utilisateur */}</h1>
                <button className="edit-button">Edit Name</button>
            </div>
            <h2 className="sr-only">Accounts</h2>
            <BankAccount title="Argent Bank Checking (x8349)" p="$2,082.79" pDesc="Available Balance" />
            <BankAccount title="Argent Bank Savings (x6712)" p="$10,928.42" pDesc="Available Balance" />
            <BankAccount title="Argent Bank Credit Card (x8349)" p="$184.30" pDesc="Current Balance" />
        </main>
    )
}