"use strict";

window.openLocalRegister = function () {
  const key = "la-bastille-register-v1";
  const schema = {
    cabinet_state: {id:1,cabinet_name:"La Bastille",place:"Saint-Denis · Lemoyne",cash_balance:0},
    navigation_preferences: {id:1,item_order:[],version:0},
    resources: {id:"", name:"", stock:0, unit_price:0, category:"", active:true},
    recipes: {id:"", name:"", product_resource_id:"", output_quantity:1, active:true},
    recipe_ingredients: {recipe_id:"", ingredient_resource_id:"", quantity:0},
    fabrication_plans: {recipe_id:"", quantity:0},
    suppliers: {id:"", resource_id:null, unit_price:null, supplier_name:null, telegram:null, location:"", active:true},
    orders: {id:"", resource_id:"", supplier_id:"", resource_name:"", supplier_name:null, supplier_location:"", supplier_telegram:null, quantity:0, unit_price:0, total_price:0, delivery_fee:0, status:"", created_at:"", delivery_date:null, delivery_time:null, delivered_at:null},
    pricing: {product_resource_id:"", pharmacy_price:null, recommended_price:0, cabinet_return:0},
    pharmacy: {product_resource_id:"", pharmacy_quantity:0},
    movements: {id:"", resource_id:null, quantity_delta:0, unit_price:null, cash_delta:0, movement_type:"", note:null, effective_date:"", created_at:"", cash_balance_after:0, actor_name:"", details:null},
    unpaid_debts: {id:"", last_name:"", first_name:"", telegram:"", amount:0, debt_date:"", debt_time:"", created_by:"", created_at:""},
    bureau_messages: {id:"", body:"", author_id:"", author_name:"", created_at:"", attachment_path:null, attachment_name:null, attachment_type:null, attachment_size:null},
    attachments: {id:"", data:""},
  };
  const blank = () => Object.fromEntries(Object.entries(schema).map(([name,row]) =>
    [name, typeof row.id === "number" ? [structuredClone(row)] : []]));
  const badBackup = () => new Error("Ce fichier n’est pas une sauvegarde La Bastille valide.");
  const numericNullable = new Set(["unit_price","pharmacy_price","attachment_size"]);
  const validate = backup => {
    if (backup?.application !== "la-bastille" || backup.version !== 1 || !backup.tables) throw badBackup();
    const tables = blank();
    for (const [name,shape] of Object.entries(schema)) {
      const rows = backup.tables[name];
      if (!Array.isArray(rows) || (typeof shape.id === "number" && (rows.length !== 1 || rows[0]?.id !== 1))) throw badBackup();
      const ids = new Set();
      tables[name] = rows.map(row => {
        if (!row || typeof row !== "object" || Array.isArray(row)) throw badBackup();
        if (typeof shape.id === "string" && (!row.id || ids.has(row.id))) throw badBackup();
        ids.add(row.id);
        const record = {};
        for (const [field,defaultValue] of Object.entries(shape)) {
          const value = row[field] === undefined ? defaultValue : row[field];
          if (field === "details") {
            if (value !== null && (!Number.isFinite(value?.stock_before) || !Number.isFinite(value?.stock_after))) throw badBackup();
            record[field] = value && {stock_before:value.stock_before,stock_after:value.stock_after};
          } else if (Array.isArray(defaultValue)) {
            if (!Array.isArray(value) || value.some(item => typeof item !== "string")) throw badBackup();
            record[field] = value;
          } else {
            const type = defaultValue === null ? (numericNullable.has(field) ? "number" : "string") : typeof defaultValue;
            if (!(value === null && defaultValue === null) && (typeof value !== type || (type === "number" && !Number.isFinite(value)))) throw badBackup();
            record[field] = value;
          }
        }
        if (name === "cabinet_state" && typeof row.telegram_owner_name === "string") record.telegram_owner_name = row.telegram_owner_name;
        if (name === "cabinet_state" && typeof row.telegram === "string") record.telegram = row.telegram;
        if (name === "attachments" && !/^data:[\w.+/-]+;base64,[\w+/=]*$/.test(record.data)) throw badBackup();
        return record;
      });
    }
    return tables;
  };
  const backup = tables => ({application:"la-bastille",version:1,tables});
  const read = () => {
    const raw = localStorage.getItem(key);
    return raw === null ? blank() : validate(JSON.parse(raw));
  };
  const write = tables => {
    localStorage.setItem(key,JSON.stringify(backup(tables)));
  };
  const status = (data,error=null) => ({data,error});
  const now = () => new Date().toISOString();
  const uid = () => crypto.randomUUID?.() || [...crypto.getRandomValues(new Uint32Array(4))].map(n=>n.toString(16)).join("-");
  function from(name) {
    const filters = [];
    const sorts = [];
    let action = "read", payload, limit = Infinity, singular = false;
    const query = {
      select() { return query; },
      eq(field,value) { filters.push(row=>row[field]===value); return query; },
      order(field,{ascending=true}={}) { sorts.push((a,b)=>String(a[field]??"").localeCompare(String(b[field]??""))*(ascending?1:-1)); return query; },
      limit(count) { limit=count; return query; },
      single() { singular=true; return query; },
      maybeSingle() { singular=true; return query; },
      insert(value) { action="insert"; payload=value; return query; },
      update(value) { action="update"; payload=value; return query; },
      delete() { action="delete"; return query; },
      then(resolve,reject) {
        return Promise.resolve().then(()=>{
          try {
            const tables=read();
            const rows=tables[name];
            if (!rows) throw new Error("Registre local inconnu.");
            let selected=rows.filter(row=>filters.every(matches=>matches(row)));
            if (action==="insert") {
              selected=[payload].flat().map(record=>({...schema[name],id:uid(),created_at:now(),...record}));
              rows.push(...selected);
            }
            if (action==="update") selected.forEach(row=>Object.assign(row,payload));
            if (action==="delete") tables[name]=rows.filter(row=>!selected.includes(row));
            if (action!=="read") write(tables);
            selected.sort((a,b)=>sorts.reduce((result,sort)=>result||sort(a,b),0));
            return status(singular ? selected[0]??null : selected.slice(0,limit));
          } catch (error) { return status(null,error); }
        }).then(resolve,reject);
      }
    };
    return query;
  }
  const find = (rows,id) => rows.find(row=>row.id===id);
  const put = (rows,field,id,values) => {
    const row=rows.find(item=>item[field]===id);
    if (row) Object.assign(row,values);
    else rows.push({[field]:id,...values});
  };
  function movement(t,{p_resource_id:id=null,p_quantity_delta:quantity=0,p_unit_price:price=null,p_cash_delta:cash=0,p_movement_type:type,p_note:note=null,p_effective_date:date=now().slice(0,10)}) {
    const resource=find(t.resources,id);
    if (id && !resource) throw new Error("Article introuvable.");
    if (resource && resource.stock+quantity<0) throw new Error("Stock insuffisant.");
    const before=resource?.stock;
    if (resource) resource.stock+=quantity;
    const cabinet=t.cabinet_state[0];
    cabinet.cash_balance=Math.round((cabinet.cash_balance+cash)*100)/100;
    t.movements.push({id:uid(),resource_id:id,quantity_delta:quantity,unit_price:price,cash_delta:cash,movement_type:type,note,effective_date:date,created_at:now(),cash_balance_after:cabinet.cash_balance,actor_name:cabinet.telegram_owner_name||"La Bastille",details:resource?{stock_before:before,stock_after:resource.stock}:null});
    return true;
  }
  function order(t,{p_resource_id:id,p_supplier_id:supplierId,p_quantity:quantity,p_delivery_fee:fee=0,p_delivery_date:date=null,p_delivery_time:time=null},status="en_cours") {
    const supplier=find(t.suppliers,supplierId);
    const resource=find(t.resources,id);
    if (!supplier?.active || !resource?.active || supplier.resource_id!==id || !(quantity>0)) throw new Error("Commande invalide.");
    const price=supplier.unit_price??resource.unit_price;
    t.orders.unshift({id:uid(),resource_id:id,supplier_id:supplierId,resource_name:resource.name,supplier_name:supplier.supplier_name,supplier_location:supplier.location,supplier_telegram:supplier.telegram,quantity,unit_price:price,total_price:Math.round(quantity*price*100)/100,delivery_fee:fee,status,created_at:now(),delivery_date:date,delivery_time:time});
    return true;
  }
  function openOrder(t,id) {
    const row=find(t.orders,id);
    if (!row || row.status==="livre") throw new Error("Cette commande ne peut plus être modifiée.");
    return row;
  }
  const prices = t => t.recipes.filter(row=>row.active).map(recipe=>{
    const id=recipe.product_resource_id;
    return {product_resource_id:id,product_name:find(t.resources,id)?.name,pharmacy_sellable:!recipe.name.startsWith("__NON_PHARMACY__:"),...t.pricing.find(row=>row.product_resource_id===id)};
  });
  const queries = {
    get_fabrication_plans:t=>t.fabrication_plans,
    get_orders_v2:t=>t.orders,
    get_recipe_pricing:prices,
    get_movement_history_with_balance:t=>t.movements,
    get_pharmacy_inventory:t=>prices(t).map(row=>({...row,...t.pharmacy.find(item=>item.product_resource_id===row.product_resource_id)})),
    get_bureau_messages:(t,p)=>t.bureau_messages.slice(-p.p_limit),
  };
  const mutations = {
    apply_movement:movement,
    create_order_v2:order,
    update_order_delivery_fee(t,p) { openOrder(t,p.p_order_id).delivery_fee=p.p_delivery_fee; return true; },
    update_order_schedule(t,p) {
      Object.assign(openOrder(t,p.p_order_id),{delivery_date:p.p_delivery_date,delivery_time:p.p_delivery_time});
      return true;
    },
    start_order(t,p) { mutations.update_order_schedule(t,p); openOrder(t,p.p_order_id).status="en_cours"; return true; },
    deliver_order(t,p) {
      const row=openOrder(t,p.p_order_id);
      if (row.status!=="en_cours") throw new Error("Démarre la commande avant de la réceptionner.");
      const fee=p.p_delivery_fee;
      movement(t,{p_resource_id:row.resource_id,p_quantity_delta:row.quantity,p_unit_price:row.unit_price,p_cash_delta:-row.total_price,p_movement_type:"ACHAT",p_note:"Réception de commande"});
      if (fee) movement(t,{p_cash_delta:-fee,p_movement_type:"FRAIS_LIVRAISON",p_note:row.resource_name});
      Object.assign(row,{status:"livre",delivery_fee:fee,delivered_at:now()});
      return true;
    },
    delete_order(t,p) { openOrder(t,p.p_order_id); t.orders=t.orders.filter(row=>row.id!==p.p_order_id); return true; },
    admin_set_recipe_pricing(t,p) {
      put(t.pricing,"product_resource_id",p.p_product_resource_id,{pharmacy_price:p.p_pharmacy_price,recommended_price:p.p_recommended_price,cabinet_return:p.p_cabinet_return});
      return true;
    },
    reset_fabrication_plan(t,p) { t.fabrication_plans=t.fabrication_plans.filter(row=>row.recipe_id!==p.p_recipe_id); return true; },
    remove_ingredient(t,p) {
      const resource=find(t.resources,p.p_resource_id);
      if (t.recipe_ingredients.some(row=>row.ingredient_resource_id===resource.id && find(t.recipes,row.recipe_id)?.active)) throw new Error("Cet ingrédient est utilisé dans une recette.");
      resource.active=false;
      t.suppliers.filter(row=>row.resource_id===resource.id).forEach(row=>row.active=false);
      return true;
    },
    craft_recipe(t,p) {
      const recipe=find(t.recipes,p.p_recipe_id);
      if (!recipe?.active || !(p.p_quantity>0)) throw new Error("Fabrication invalide.");
      for (const ingredient of t.recipe_ingredients.filter(row=>row.recipe_id===recipe.id)) {
        movement(t,{p_resource_id:ingredient.ingredient_resource_id,p_quantity_delta:-ingredient.quantity*p.p_quantity,p_movement_type:"FABRICATION",p_note:recipe.name});
      }
      movement(t,{p_resource_id:recipe.product_resource_id,p_quantity_delta:p.p_quantity*recipe.output_quantity,p_movement_type:"FABRICATION",p_note:recipe.name});
      const plan=t.fabrication_plans.find(row=>row.recipe_id===recipe.id);
      if (plan) plan.quantity=Math.max(0,plan.quantity-p.p_quantity);
      return true;
    },
    queue_recipe_missing_with_suppliers(t,p) {
      const recipe=find(t.recipes,p.p_recipe_id);
      if (!recipe?.active || !(p.p_quantity>0)) throw new Error("Fabrication invalide.");
      let added=0;
      for (const row of t.recipe_ingredients.filter(item=>item.recipe_id===recipe.id)) {
        const id=row.ingredient_resource_id;
        const pending=t.orders.filter(item=>item.resource_id===id && item.status!=="livre").reduce((sum,item)=>sum+item.quantity,0);
        const quantity=row.quantity*p.p_quantity-(find(t.resources,id)?.stock??0)-pending;
        if (quantity<=0) continue;
        order(t,{p_resource_id:id,p_supplier_id:p.p_supplier_choices[id],p_quantity:quantity},"a_commander");
        added++;
      }
      if (added) put(t.fabrication_plans,"recipe_id",recipe.id,{quantity:p.p_quantity});
      return added;
    },
    set_pharmacy_quantity(t,p) { put(t.pharmacy,"product_resource_id",p.p_product_resource_id,{pharmacy_quantity:p.p_quantity}); return true; },
    record_pharmacy_count(t,p) {
      const id=p.p_product_resource_id;
      const previous=t.pharmacy.find(row=>row.product_resource_id===id)?.pharmacy_quantity??0;
      const sold=Math.max(0,previous-p.p_current_quantity);
      const revenue=sold*(t.pricing.find(row=>row.product_resource_id===id)?.pharmacy_price??0);
      if (sold) {
        mutations.set_pharmacy_quantity(t,{p_product_resource_id:id,p_quantity:p.p_current_quantity});
        movement(t,{p_quantity_delta:-sold,p_cash_delta:revenue,p_unit_price:revenue/sold,p_movement_type:"PHARMACIE_VENTE",p_note:find(t.resources,id)?.name||"Vente au comptoir"});
      }
      return {sold_quantity:sold,revenue};
    },
    post_bureau_message_v2(t,p) {
      t.bureau_messages.push({id:uid(),body:p.p_body,author_id:"local",author_name:t.cabinet_state[0].telegram_owner_name||"La Bastille",created_at:now(),attachment_path:p.p_attachment_path,attachment_name:p.p_attachment_name,attachment_type:p.p_attachment_type,attachment_size:p.p_attachment_size});
      return true;
    },
    delete_bureau_message(t,p) {
      const message=find(t.bureau_messages,p.p_message_id);
      t.bureau_messages=t.bureau_messages.filter(row=>row.id!==p.p_message_id);
      t.attachments=t.attachments.filter(row=>row.id!==message?.attachment_path);
      return null;
    }
  };
  const mediaType = /^(image\/(png|jpeg|gif|webp)|video\/(mp4|webm)|audio\/(mpeg|ogg|wav))$/;
  return {
    from,
    async rpc(name,p={}) {
      try {
        const tables=read();
        if (Object.hasOwn(queries,name)) return status(queries[name](tables,p));
        if (!Object.hasOwn(mutations,name)) throw new Error("Action indisponible dans le registre local.");
        const data=mutations[name](tables,p);
        write(tables);
        return status(data);
      } catch (error) { return status(null,error); }
    },
    storage:{from:()=>({
      async upload(path,file) {
        try {
          const bytes=new Uint8Array(await file.arrayBuffer());
          let binary="";
          for(let i=0;i<bytes.length;i+=8192) binary+=String.fromCharCode(...bytes.subarray(i,i+8192));
          const tables=read();
          const type=mediaType.test(file.type)?file.type:"application/octet-stream";
          tables.attachments.push({id:path,data:"data:"+type+";base64,"+btoa(binary)});
          write(tables);
          return status(true);
        } catch(error) { return status(null,error); }
      },
      async remove(paths) {
        const tables=read();
        tables.attachments=tables.attachments.filter(row=>!paths.includes(row.id));
        write(tables);
      },
      async createSignedUrl(path) {
        const data=find(read().attachments,path)?.data;
        if (!data) return status(null,new Error("Pièce jointe introuvable."));
        const [header,content]=data.split(",");
        const type=header.slice(5,-7);
        const bytes=Uint8Array.from(atob(content),char=>char.charCodeAt(0));
        return status({signedUrl:URL.createObjectURL(new Blob([bytes],{type:mediaType.test(type)?type:"application/octet-stream"}))});
      }
    })},
    exportBackup:()=>backup(read()),
    previousBackup() {
      const saved=localStorage.getItem(key+"-avant-import");
      return saved ? backup(validate(JSON.parse(saved))) : null;
    },
    validateBackup:validate,
    restore(tables) {
      localStorage.setItem(key+"-avant-import",localStorage.getItem(key)??JSON.stringify(backup(blank())));
      write(tables);
    },
    reset:()=>write(blank())
  };
};
