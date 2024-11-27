interface Props {
    role: 0 | 1 | 2; 
}

export default function RoleBadge({role = 2}: Props) {
    const roleColors = [
        "bg-blue-300 outline-blue-500 text-blue-500",
        "bg-red-300 outline-red-500 text-red-500",
        "bg-green-300 outline-green-600 text-green-600"
    ]
    return(
        <div className={"rounded-full outline outline-1 px-2 text-[10px] font-lato grid place-items-center " + roleColors[role]}>
            {
                role === 0 ? "Admin" 
                    : role === 1 ? "Agent" : "Customer"
            }
        </div>
    )
}