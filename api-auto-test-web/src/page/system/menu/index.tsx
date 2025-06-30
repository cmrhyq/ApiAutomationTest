import FormPanel from "../../../components/panel";

export default function Menu(){
  return (
    <div>
      <h1>Menu</h1>
      <FormPanel formData={[{
        name: "username",
        label: "username",
        order: 1,
        width: 8,
        placeholder: "123"
      }]}/>
    </div>
  )
}