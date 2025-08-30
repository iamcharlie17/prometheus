import Link from "next/link";

const page = () => {
    return (
        <div>
            <h1>Sign In</h1>
            <Link href={'/auth/signup'}>click to sign up</Link>
        </div>
    );
};

export default page;