import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function NotConnectedCard() {
  return (
    <div>
      <div className="m-4 p-4 grid grid grid-cols-7 gap-4  ">
        <div className="col-start-3 col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>This is not a stolen component!</CardTitle>
              <CardDescription>
                Dont check the git commits!
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}
